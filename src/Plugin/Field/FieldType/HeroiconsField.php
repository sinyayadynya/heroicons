<?php

namespace Drupal\heroicons\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Plugin implementation of the 'heroicons' field type.
 *
 * @FieldType(
 *   id = "heroicons",
 *   label = @Translation("Heroicons"),
 *   description = @Translation("A field to select and display Heroicons."),
 *   default_widget = "heroicons_default",
 *   default_formatter = "heroicons_default"
 * )
 */
class HeroiconsField extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'icon_name' => [
          'type' => 'varchar',
          'length' => 255,
          'not null' => FALSE,
        ],
        'icon_style' => [
          'type' => 'varchar',
          'length' => 255,
          'not null' => FALSE,
        ],
      ],
      'indexes' => [
        'icon_name' => ['icon_name'],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties = [];

    $properties['icon_name'] = DataDefinition::create('string')
      ->setLabel(t('Icon Name'));

    $properties['icon_style'] = DataDefinition::create('string')
      ->setLabel(t('Icon Style'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $icon_name = $this->get('icon_name')->getValue();
    $icon_style = $this->get('icon_style')->getValue();
    
    // Field is empty if icon_name is empty (style can have a default)
    return empty($icon_name);
  }

}
