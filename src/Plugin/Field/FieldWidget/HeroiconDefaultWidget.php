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
        // Define the form elements for the icon name and style here.
        $element['icon_name'] = [
          '#type' => 'textfield',
          '#title' => $this->t('Icon Name'),
          '#default_value' => isset($items[$delta]->icon_name) ? $items[$delta]->icon_name : NULL,
        ];

        $element['icon_style'] = [
          '#type' => 'select',
          '#title' => $this->t('Icon Style'),
          '#options' => [
            'outline' => $this->t('Outline'),
            'solid' => $this->t('Solid'),
            'mini' => $this->t('Mini'),
          ],
          '#default_value' => isset($items[$delta]->icon_style) ? $items[$delta]->icon_style : NULL,
        ];

        // Add the preview element
        $element['icon_preview'] = [
            '#type' => 'markup',
            '#markup' => '<div id="icon-preview"></div>',
            '#attached' => [
              'html_head' => [
                [
                  '#tag' => 'script',
                  '#attributes' => ['src' => 'https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.min.js'],
                ],
                'alpine-js'
              ],
              'html_head' => [
                [
                  '#tag' => 'script',
                  '#value' => '
                    document.addEventListener("DOMContentLoaded", function() {
                      // Your Alpine.js logic here
                      // For example: document.getElementById("icon-preview").innerHTML = "Your icon here";
                    });
                  ',
                ],
                'alpine-js-inline'
              ],
            ],
          ];


        // Attach the Alpine.js library
        $element['#attached']['library'][] = 'heroicons/heroicon_preview_alpine';

        $element['#attached']['html_head'][] = [
            [
              '#tag' => 'script',
              '#attributes' => ['src' => 'https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.min.js'],
            ],
            'alpine-js'
          ];

        return $element;  // Make sure to return the $element array
      }

}
