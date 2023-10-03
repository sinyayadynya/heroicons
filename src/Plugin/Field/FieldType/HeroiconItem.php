<?php

namespace Drupal\heroicons\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Plugin implementation of the 'heroicon' field type.
 *
 * @FieldType(
 *   id = "heroicon",
 *   label = @Translation("Heroicon"),
 *   description = @Translation("A field to store a Heroicon."),
 *   default_widget = "heroicon_default",
 *   default_formatter = "heroicon_default"
 * )
 */
class HeroiconItem extends FieldItemBase {

  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'icon_name' => [
          'type' => 'varchar',
          'length' => 255,
        ],
        'icon_style' => [
          'type' => 'varchar',
          'length' => 50,
        ],
      ],
    ];
  }

  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['icon_name'] = DataDefinition::create('string')
      ->setLabel(t('Icon Name'));

    $properties['icon_style'] = DataDefinition::create('string')
      ->setLabel(t('Icon Style'));

    return $properties;
  }
}
