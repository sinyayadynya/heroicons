<?php

namespace Drupal\heroicons\Plugin\Field\FieldWidget;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
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
    $style = isset($items[$delta]->icon_style) ? $items[$delta]->icon_style : '';

    $element += [
      '#type' => 'fieldset',
      '#title' => $this->t('Select icon'),
    ];

    $element['icon_name'] = [
      '#type' => 'select',
      '#title' => $this->t('Icon'),
      '#default_value' => $value,
      '#options' => $this->getIconOptions(),
    ];

    $element['icon_style'] = [
      '#type' => 'select',
      '#title' => $this->t('Style'),
      '#default_value' => $style,
      '#options' => [
        'outline' => $this->t('Outline'),
        'solid' => $this->t('Solid'),
        'mini' => $this->t('Mini'),
      ],
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

}
