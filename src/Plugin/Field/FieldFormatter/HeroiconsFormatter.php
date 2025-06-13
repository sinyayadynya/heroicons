<?php

/**
 * @file
 * Contains \Drupal\heroicons\Plugin\Field\FieldFormatter\HeroiconsFormatter.
 */

declare(strict_types=1);

namespace Drupal\heroicons\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;

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
   * The logger factory.
   *
   * @var \Drupal\Core\Logger\LoggerChannelFactoryInterface
   */
  protected $loggerFactory;

  /**
   * {@inheritdoc}
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings, ModuleHandlerInterface $module_handler, LoggerChannelFactoryInterface $logger_factory) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);
    $this->moduleHandler = $module_handler;
    $this->loggerFactory = $logger_factory;
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
      $container->get('module_handler'),
      $container->get('logger.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    $logger = $this->loggerFactory->get('heroicons');
    foreach ($items as $delta => $item) {
        $icon_name = $item->icon_name;

        // Determine icon style and size. New case added for 'micro'.
        switch ($item->icon_style) {
            case 'mini':
                $icon_style = 'solid'; // Mini icons use 'solid' style.
                $icon_size = '20'; // Mini icons are in the '20' directory.
                break;
            case 'micro':
                $icon_style = 'solid'; // Micro icons also use 'solid' style.
                $icon_size = '16'; // New case for 'micro' size.
                break;
            case 'solid':
            case 'outline':
                $icon_style = $item->icon_style;
                $icon_size = '24'; // Default size for solid and outline.
                break;
            default:
                $icon_style = 'solid'; // Fallback to solid style.
                $icon_size = '24'; // Fallback size.
        }

        $icon_path = $this->moduleHandler->getModule('heroicons')->getPath() . "/icons/$icon_size/$icon_style/$icon_name.svg";

        if (file_exists($icon_path)) {
            $svg_content = file_get_contents($icon_path);
            $elements[$delta] = [
                '#markup' => $svg_content,
                '#allowed_tags' => ['svg', 'path'],
            ];
        } else {
            $logger->error('File not found: @icon_path', ['@icon_path' => $icon_path]);
        }
    }
    return $elements;
}
}
