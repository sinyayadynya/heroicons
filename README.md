# Heroicons Drupal Module

This module integrates the [Heroicons](https://heroicons.com/) library into Drupal, providing a field type for selecting and displaying SVG icons with a modern, searchable interface.

## Features

- **Searchable Interface**: Catalyst-style combobox with real-time search across 1,176+ icons
- **SVG Previews**: 16×16px thumbnails of each icon in the dropdown for easy visual selection
- **Keyboard Navigation**: Full keyboard support with ↑↓ arrow keys, Enter, and Esc
- **Alpine.js Powered**: Lightweight, accessible component with no jQuery dependency
- **Performance Optimized**: SVG sprite system for efficient icon loading
- **Accessibility**: ARIA compliant with screen reader support
- **Four Icon Styles**: Outline (24px), Solid (24px), Mini (20px), and Micro (16px)
- **Inline SVG Rendering**: Icons rendered as inline SVG for easy styling and manipulation

## Version 1.3 Highlights

✨ **New in v1.3**: Complete UX overhaul with searchable combobox interface
- Replaced difficult-to-use dropdowns with intuitive search
- Added visual icon previews for faster selection
- Improved accessibility and keyboard navigation
- Maintained full backward compatibility

## Requirements

- Drupal 10 or 11
- PHP extensions: `ext-dom` and `ext-libxml`
- Modern browser with JavaScript enabled

## Installation

1. Download and place the `heroicons` folder in the `web/modules/custom/` directory
2. Navigate to Extend (`/admin/modules`) and enable the Heroicons module
3. Clear caches: `drush cache:rebuild`

## Usage

### Adding a Heroicons Field

1. Go to **Structure** → **Content types** → **[Your content type]** → **Manage fields**
2. Click **Add field** and select **Heroicons** from the field type dropdown
3. Configure field settings and save

### Using the Icon Selector

1. When editing content, find your Heroicons field
2. **Search**: Type in the search box to filter icons by name
3. **Browse**: Use ↑↓ arrow keys to navigate options
4. **Select**: Click an icon or press Enter to choose
5. **Style**: Choose from Outline, Solid, Mini, or Micro variants

### Field Configuration

- **Icon Name**: Automatically populated from user selection
- **Icon Style**: 
  - **Outline (24px)**: Outlined icons for general use
  - **Solid (24px)**: Filled icons for emphasis
  - **Mini (20px)**: Compact solid icons
  - **Micro (16px)**: Smallest solid icons

## Technical Details

### Architecture
- **Frontend**: Alpine.js + Headless UI for accessibility
- **Performance**: ~35KB icon names, cached SVG sprite (~100KB)
- **Compatibility**: Respects Drupal Form API, no Ajax required
- **Fallback**: Hidden form inputs maintain compatibility

### Browser Support
- Chrome/Edge 88+
- Firefox 78+  
- Safari 14+

## Development

### File Structure
```
heroicons/
├── css/
│   ├── heroicons-combobox.css    # Main combobox styling
│   └── heroicons-sprite.css      # SVG sprite utilities
├── js/
│   └── heroicons-combobox.js     # Alpine.js component
├── icons/                        # Icon SVG files
├── src/Plugin/Field/             # Drupal field plugins  
└── templates/
    └── heroicons-sprite.html.twig # SVG sprite template
```

### Customization
The combobox can be styled by overriding CSS classes:
- `.heroicons-combobox__input` - Search input
- `.heroicons-combobox__dropdown` - Dropdown container  
- `.heroicons-combobox__option` - Individual options
- `.heroicons-combobox__icon` - Icon thumbnails

## Troubleshooting

**Icons not showing?**
- Clear Drupal caches: `drush cache:rebuild`
- Verify Alpine.js loads in browser dev tools
- Check for JavaScript errors in console

**Search not working?**
- Ensure JavaScript is enabled
- Verify Alpine.js CDN accessibility
- Check browser compatibility

## Contributing

Contributions welcome! Please submit issues and pull requests on [GitHub](https://github.com/sinyayadynya/heroicons).

### Changelog

**v1.3.0** (2024)
- ✨ Added searchable combobox interface
- ✨ Added visual icon previews  
- ✨ Added keyboard navigation
- ✨ Improved accessibility (ARIA support)
- ✨ Added Alpine.js integration
- 🎨 Modern, Catalyst-inspired design
- ⚡ Performance optimizations with SVG sprites

**v1.1.1** (Previous)
- Basic dropdown selectors
- Four icon style support

## License

Licensed under [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html).
