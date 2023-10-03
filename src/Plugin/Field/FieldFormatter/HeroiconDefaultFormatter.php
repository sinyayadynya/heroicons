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
        $elements = [];

        foreach ($items as $delta => $item) {
          $icon_name = $item->icon_name;
          $icon_style = $item->icon_style;

          // You can customize this part to render the icon as you like.
          $elements[$delta] = [
            '#markup' => '<span class="heroicon-' . $icon_style . '">' . $icon_name . '</span>',
          ];
        }

        return $elements;
      }

}
