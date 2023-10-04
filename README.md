# Heroicons Drupal Module

This module integrates the [Heroicons](https://heroicons.com/) library into Drupal, providing a field type for selecting and displaying SVG icons from the Heroicons library.

## Features

- Provides a new field type for Heroicons.
- Offers a dropdown icon selector powered by Alpine.js.
- Supports rendering icons inline within the HTML for easy styling and manipulation.

## Requirements

- Drupal 10.1 or higher.
- PHP extensions: `ext-dom` and `ext-libxml`.

## Installation

1. Download and place the `heroicons` folder in the `web/modules/custom/` directory of your Drupal installation.
2. Navigate to the Extend page (`/admin/modules`) and enable the Heroicons module.

## Configuration

After enabling the module, you can add the Heroicons field to any entity type via the Manage Fields interface.

### Field Settings

- **Icon Name**: The name of the icon as defined by Heroicons library.
- **Icon Style**: The style of the icon. Options are Solid, Outline, and Mini.

## Usage

1. Add the Heroicons field to your desired entity type.
2. While editing an entity, select an icon using the dropdown icon selector.
3. The selected icon will be rendered inline within the HTML, allowing you to style or manipulate it using CSS and JavaScript.

## Contributing

Contributions are welcome! Please submit issues and/or pull requests on the [GitHub repo](https://github.com/sinyayadynya/heroicons).

## License

This project is licensed under the [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html).
