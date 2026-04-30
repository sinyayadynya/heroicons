<?php

declare(strict_types=1);

namespace Drupal\heroicons;

use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Render\Markup;
use DOMDocument;
use RuntimeException;

class HeroiconManager {

  private const STYLE_DIRECTORY_MAP = [
    'micro' => ['size' => '16', 'style' => 'solid'],
    'mini' => ['size' => '20', 'style' => 'solid'],
    'solid' => ['size' => '24', 'style' => 'solid'],
    'outline' => ['size' => '24', 'style' => 'outline'],
  ];

  public function __construct(private readonly ModuleHandlerInterface $moduleHandler) {
  }

  public function getSvg(string $name, array $options = []): ?Markup {
    $style = $options['style'] ?? 'outline';
    $sizeOverride = $options['size'] ?? NULL;
    $attributes = $options['attributes'] ?? [];

    [$directory, $variant] = $this->resolveDirectoryAndVariant($style, $sizeOverride);

    $path = DRUPAL_ROOT . '/' . $this->moduleHandler->getModule('heroicons')->getPath() . "/icons/{$directory}/{$variant}/{$name}.svg";

    if (!is_file($path)) {
      return NULL;
    }

    $svgMarkup = file_get_contents($path);
    if ($svgMarkup === FALSE) {
      throw new RuntimeException(sprintf('Unable to read Heroicon SVG file for "%s".', $name));
    }

    if (!empty($attributes)) {
      $svgMarkup = $this->applyAttributes($svgMarkup, $attributes);
    }

    return Markup::create($svgMarkup);
  }

  public function exists(string $name, string $style = 'outline', ?string $size = NULL): bool {
    [$directory, $variant] = $this->resolveDirectoryAndVariant($style, $size);
    $path = DRUPAL_ROOT . '/' . $this->moduleHandler->getModule('heroicons')->getPath() . "/icons/{$directory}/{$variant}/{$name}.svg";
    return is_file($path);
  }

  public function listAvailable(?string $style = NULL): array {
    $styles = $style ? [$style] : array_keys(self::STYLE_DIRECTORY_MAP);
    $icons = [];

    foreach ($styles as $styleKey) {
      [$size, $variant] = $this->resolveDirectoryAndVariant($styleKey, NULL);
      $directory = DRUPAL_ROOT . '/' . $this->moduleHandler->getModule('heroicons')->getPath() . "/icons/{$size}/{$variant}";
      if (!is_dir($directory)) {
        continue;
      }
      foreach (glob($directory . '/*.svg') as $file) {
        $icons[] = basename($file, '.svg');
      }
    }

    sort($icons);
    return array_values(array_unique($icons));
  }

  private function resolveDirectoryAndVariant(string $style, ?string $sizeOverride): array {
    $styleKey = array_key_exists($style, self::STYLE_DIRECTORY_MAP) ? $style : 'solid';
    $directory = $sizeOverride ?? self::STYLE_DIRECTORY_MAP[$styleKey]['size'];
    $variant = self::STYLE_DIRECTORY_MAP[$styleKey]['style'];

    return [$directory, $variant];
  }

  private function applyAttributes(string $svgMarkup, array $attributes): string {
    $dom = new DOMDocument('1.0', 'UTF-8');
    $previous = libxml_use_internal_errors(TRUE);
    $dom->loadXML($svgMarkup);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);

    $svgElement = $dom->documentElement;

    foreach ($attributes as $key => $value) {
      if ($value === NULL) {
        continue;
      }
      if ($key === 'class' && $svgElement->hasAttribute('class')) {
        $value = trim($svgElement->getAttribute('class') . ' ' . $value);
      }
      $svgElement->setAttribute($key, (string) $value);
    }

    return $dom->saveXML($svgElement);
  }

}
