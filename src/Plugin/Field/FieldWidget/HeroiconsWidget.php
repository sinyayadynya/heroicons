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

    // Attach libraries and settings for React
    $element['#attached']['library'][] = 'heroicons/react_widget';
    $element['#attached']['drupalSettings']['heroicons'][$field_name][$delta] = [
      'allIcons' => $allIcons,
      'value' => $value,
      'style' => $style,
    ];

    // Hidden input for icon name - OUTSIDE React container so it doesn't get replaced
    $element['icon_name'] = [
      '#type' => 'hidden',
      '#default_value' => $value,
      '#attributes' => [
        'data-heroicons-icon-name' => TRUE,
        'class' => ['heroicons-icon-name-input'],
      ],
    ];
    
    // Hidden input for icon style - OUTSIDE React container so it doesn't get replaced
    $element['icon_style'] = [
      '#type' => 'hidden',
      '#default_value' => $style,
      '#attributes' => [
        'data-heroicons-icon-style' => TRUE,
        'class' => ['heroicons-icon-style-input'],
      ],
    ];
    
    // React widget container - React will render inside this
    $element['react_container'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['heroicons-react-widget'],
        'data-heroicons-react-widget' => 'true',
        'data-field-name' => $field_name,
        'data-delta' => $delta,
        'id' => $html_id,
      ],
    ];
    
    // Add debug notice during development
    if (\Drupal::state()->get('heroicons_debug', FALSE)) {
      $element['debug'] = [
        '#type' => 'markup',
        '#markup' => $this->t('<div class="heroicons-debug">React widget loading... Value: @value, Style: @style</div>', [
          '@value' => $value ?: 'none',
          '@style' => $style,
        ]),
      ];
    }

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    $new_values = [];
    
    foreach ($values as $delta => $value) {
      $icon_name = isset($value['icon_name']) ? trim($value['icon_name']) : '';
      $icon_style = isset($value['icon_style']) ? $value['icon_style'] : 'outline';
      
      // Only save values if an icon is selected
      if (!empty($icon_name)) {
        $new_values[$delta]['icon_name'] = $icon_name;
        $new_values[$delta]['icon_style'] = $icon_style;
      } else {
        // If no icon is selected, don't save anything (field is empty)
        $new_values[$delta] = [];
      }
    }
    
    return $new_values;
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
          <div
            class="heroicons-combobox__icon"
            style="width: 16px; height: 16px; background-color: currentColor; opacity: 0.3; border-radius: 2px;"
            aria-hidden="true"
          ></div>
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
