<?php

declare(strict_types=1);

namespace Drupal\heroicons\Twig;

use Drupal\heroicons\HeroiconManager;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class HeroiconsExtension extends AbstractExtension {

  public function __construct(private readonly HeroiconManager $manager) {
  }

  public function getFunctions(): array {
    return [
      new TwigFunction('heroicon', [$this, 'renderIcon'], ['is_safe' => ['html']]),
      new TwigFunction('heroicon_exists', [$this, 'iconExists']),
      new TwigFunction('heroicon_list', [$this, 'listIcons']),
    ];
  }

  public function renderIcon(string $name, array $options = []): string {
    $icon = $this->manager->getSvg($name, $options);
    return $icon?->__toString() ?? '';
  }

  public function iconExists(string $name, string $style = 'outline', ?string $size = NULL): bool {
    return $this->manager->exists($name, $style, $size);
  }

  public function listIcons(?string $style = NULL): array {
    return $this->manager->listAvailable($style);
  }

}
