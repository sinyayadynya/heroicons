<?php

namespace Drupal\heroicons\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'heroicon_default' widget.
 *
 * @FieldWidget(
 *   id = "heroicon_default",
 *   label = @Translation("Heroicon default"),
 *   field_types = {
 *     "heroicon"
 *   }
 * )
 */
class HeroiconDefaultWidget extends WidgetBase {

  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    // Your form element code here.
  }
}
