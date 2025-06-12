<?php

namespace Drupal\heroicons\Plugin\Field\FieldWidget;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Component\Utility\Html;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'heroicons_default' widget.
 *
 * @FieldWidget(
 *   id = "heroicons_default",
 *   label = @Translation("Heroicons select"),
 *   field_types = {
 *     "heroicons"
 *   }
 * )
 */
class HeroiconsWidget extends WidgetBase implements ContainerFactoryPluginInterface {

  /**
   * The module handler service.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * Constructs a HeroiconsWidget object.
   *
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler service.
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, array $third_party_settings, ModuleHandlerInterface $module_handler) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $third_party_settings);
    $this->moduleHandler = $module_handler;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $plugin_id,
      $plugin_definition,
      $configuration['field_definition'],
      $configuration['settings'],
      $configuration['third_party_settings'],
      $container->get('module_handler')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(
    FieldItemListInterface $items,
    $delta,
    array $element,
    array &$form,
    FormStateInterface $form_state
  ) {
    $value = isset($items[$delta]->icon_name) ? $items[$delta]->icon_name : '';
    $style = isset($items[$delta]->icon_style) ? $items[$delta]->icon_style : 'outline';

    // Build style-specific icon lists for JavaScript
    $allIcons = $this->getStyleSpecificIcons();

    // Create unique ID for this field instance
    $field_name = $this->fieldDefinition->getName();
    $html_id = Html::getUniqueId("heroicons-{$field_name}-{$delta}");

    // Attach libraries and settings
    $element['#attached']['library'][] = 'heroicons/combobox';
    $element['#attached']['drupalSettings']['heroicons'][$field_name][$delta] = [
      'allIcons' => $allIcons,
      'value' => $value,
      'style' => $style,
    ];

    // Main container with Alpine.js data
    $element += [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['heroicons-combobox'],
        'x-data' => "heroiconsCombobox(drupalSettings.heroicons['{$field_name}'][{$delta}])",
        'id' => $html_id,
        'x-init' => 'init()',
      ],
    ];

    // Search input field
    $element['search'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Search icons'),
      '#attributes' => [
        'class' => ['heroicons-combobox__input'],
        'x-ref' => 'searchInput',
        'x-model' => 'query',
        ':value' => 'displayValue',
        '@focus' => 'handleInputFocus()',
        '@blur' => 'handleInputBlur()',
        '@keydown' => 'handleKeydown($event)',
        'placeholder' => $this->t('Search for an icon...'),
        'autocomplete' => 'off',
        'role' => 'combobox',
        'aria-expanded' => 'false',
        ':aria-expanded' => 'open',
        'aria-haspopup' => 'listbox',
        ':aria-activedescendant' => 'activeIndex >= 0 ? `option-${activeIndex}` : null',
      ],
    ];

    // Hidden input for actual field value
    $element['icon_name'] = [
      '#type' => 'hidden',
      '#default_value' => $value,
      '#attributes' => [
        'x-ref' => 'inputIcon',
      ],
    ];

    // Style selector
    $element['icon_style'] = [
      '#type' => 'select',
      '#title' => $this->t('Style'),
      '#default_value' => $style,
      '#options' => [
        'outline' => $this->t('Outline (24px)'),
        'solid' => $this->t('Solid (24px)'),
        'mini' => $this->t('Mini (20px)'),
        'micro' => $this->t('Micro (16px)'),
      ],
      '#attributes' => [
        'class' => ['heroicons-combobox__style-select'],
        'x-ref' => 'styleSelect',
        '@change' => 'handleStyleChange()',
      ],
    ];

    // Dropdown container
    $element['dropdown'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['heroicons-combobox__dropdown'],
        'x-show' => 'open',
        'x-transition' => 'true',
        '@click.outside' => 'closeCombobox()',
      ],
    ];

    // Options list with virtual scrolling
    $element['dropdown']['options'] = [
      '#type' => 'html_tag',
      '#tag' => 'ul',
      '#attributes' => [
        'class' => ['heroicons-combobox__options'],
        'x-ref' => 'optionsList',
        'x-virtual' => 'true',
        'x-virtual:item-height' => '40',
        'x-virtual:items' => 'filtered',
        'x-virtual:buffer' => '8',
        'role' => 'listbox',
        'aria-label' => $this->t('Available icons'),
        'style' => 'max-height: 240px; overflow-y: auto;',
      ],
      // Use #markup instead of #value to avoid HtmlTag rendering errors when
      // Drupal expects a string value. buildVirtualOptionsTemplate() returns a
      // HTML string used for the virtual scrolling template.
      '#markup' => $this->buildVirtualOptionsTemplate(),
    ];

    // No results message
    $element['dropdown']['no_results'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => [
        'class' => ['heroicons-combobox__no-results'],
        'x-show' => 'filtered.length === 0 && query.length > 0',
        'style' => 'padding: 12px; text-align: center; color: #6b7280; font-size: 14px;',
      ],
      // Ensure the rendered content is a string via #markup to satisfy the
      // HtmlTag renderer introduced in newer Drupal versions.
      '#markup' => $this->t('No icons found'),
    ];

    return $element;
  }

  /**
   * Helper function to get the icon options.
   */
  protected function getIconOptions() {
    $icon_options = [];

    // Define the paths to the icon directories.
    $icon_directories = [
      \Drupal::root() . '/' . $this->moduleHandler->getModule('heroicons')->getPath() . '/icons/16/solid',
      \Drupal::root() . '/' . $this->moduleHandler->getModule('heroicons')->getPath() . '/icons/20/solid',
      \Drupal::root() . '/' . $this->moduleHandler->getModule('heroicons')->getPath() . '/icons/24/outline',
      \Drupal::root() . '/' . $this->moduleHandler->getModule('heroicons')->getPath() . '/icons/24/solid',
    ];

    foreach ($icon_directories as $directory) {
      // Get all SVG files in the directory.
      $files = glob("$directory/*.svg");

      foreach ($files as $file) {
        // Extract the icon name from the file name.
        $icon_name = basename($file, '.svg');

        // Add the icon name to the options array, if it's not already there.
        if (!isset($icon_options[$icon_name])) {
          $icon_options[$icon_name] = $icon_name;
        }
      }
    }

    // Sort the icon options alphabetically.
    asort($icon_options);

    return $icon_options;
  }

  /**
   * Get style-specific icon arrays.
   */
  protected function getStyleSpecificIcons() {
    $module_path = $this->moduleHandler->getModule('heroicons')->getPath();
    $base_path = \Drupal::root() . '/' . $module_path . '/icons';
    
    $style_configs = [
      'outline' => ['size' => '24', 'style' => 'outline'],
      'solid' => ['size' => '24', 'style' => 'solid'],
      'mini' => ['size' => '20', 'style' => 'solid'],
      'micro' => ['size' => '16', 'style' => 'solid'],
    ];
    
    $allIcons = [];
    
    foreach ($style_configs as $style_key => $config) {
      $directory = $base_path . '/' . $config['size'] . '/' . $config['style'];
      $icons = [];
      
      if (is_dir($directory)) {
        $files = glob("$directory/*.svg");
        foreach ($files as $file) {
          $icon_name = basename($file, '.svg');
          $icons[] = ['name' => $icon_name];
        }
        // Sort alphabetically
        usort($icons, function($a, $b) {
          return strcmp($a['name'], $b['name']);
        });
      }
      
      $allIcons[$style_key] = $icons;
    }
    
    return $allIcons;
  }

  /**
   * Build the HTML template for virtual scrolling options list.
   */
  protected function buildVirtualOptionsTemplate() {
    return '
      <template x-for="(icon, index) in $virtual.items" :key="icon.name">
        <li
          class="heroicons-combobox__option"
          :class="{ \'heroicons-combobox__option--active\': getVirtualIndex(icon) === activeIndex }"
          :data-index="getVirtualIndex(icon)"
          :id="`option-${getVirtualIndex(icon)}`"
          @click="choose(icon)"
          role="option"
          :aria-selected="selected === icon.name"
          style="height: 40px; display: flex; align-items: center;"
        >
          <svg
            class="heroicons-combobox__icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <use :href="getIconSvgPath(icon.name)" />
          </svg>
          <span class="heroicons-combobox__option-text" x-text="icon.name"></span>
        </li>
      </template>
    ';
  }

  /**
   * Build the HTML template for the options list (legacy fallback).
   */
  protected function buildOptionsTemplate() {
    return '
      <template x-for="(icon, index) in filtered" :key="icon.name">
        <li
          class="heroicons-combobox__option"
          :class="{ \'heroicons-combobox__option--active\': index === activeIndex }"
          :data-index="index"
          :id="`option-${index}`"
          @click="choose(icon)"
          role="option"
          :aria-selected="selected === icon.name"
        >
          <svg
            class="heroicons-combobox__icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <use :href="getIconSvgPath(icon.name)" />
          </svg>
          <span class="heroicons-combobox__option-text" x-text="icon.name"></span>
        </li>
      </template>
    ';
  }

}
