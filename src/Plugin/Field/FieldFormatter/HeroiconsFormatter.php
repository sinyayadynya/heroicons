<?php

namespace Drupal\heroicons\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;


/**
 * Plugin implementation of the 'heroicons_default' formatter.
 *
 * @FieldFormatter(
 *   id = "heroicons_default",
 *   label = @Translation("Default"),
 *   field_types = {
 *     "heroicons"
 *   }
 * )
 */
class HeroiconsFormatter extends FormatterBase implements ContainerFactoryPluginInterface {

    /**
     * The module handler service.
     *
     * @var \Drupal\Core\Extension\ModuleHandlerInterface
     */
    protected $moduleHandler;

    /**
     * {@inheritdoc}
     */
    public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings, ModuleHandlerInterface $module_handler) {
      parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);
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
        $configuration['label'],
        $configuration['view_mode'],
        $configuration['third_party_settings'],
        $container->get('module_handler')
      );
    }

    /**
     * {@inheritdoc}
     */
    public function viewElements(FieldItemListInterface $items, $langcode) {
      $elements = [];
      foreach ($items as $delta => $item) {
        // Get the icon name.
        $icon_name = $item->value;
        // Get the path to the icon.
        $icon_path = $this->moduleHandler->getModule('heroicons')->getPath() . '/icons/' . $icon_name . '.svg';
        // If the icon file exists, render it.
        if (file_exists($icon_path)) {
          $elements[$delta] = [
            '#markup' => file_get_contents($icon_path),
            '#allowed_tags' => ['svg'],
          ];
        }
      }
      return $elements;
    }

  }
