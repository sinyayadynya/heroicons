<?php

namespace Drupal\heroicons\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Plugin implementation of the 'heroicon_default' formatter.
 *
 * @FieldFormatter(
 *   id = "heroicon_default",
 *   label = @Translation("Heroicon default"),
 *   field_types = {
 *     "heroicon"
 *   }
 * )
 */
class HeroiconDefaultFormatter extends FormatterBase {

  public function viewElements(FieldItemListInterface $items, $langcode) {
    // Your view elements code here.
  }
}
