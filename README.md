# Heroicons Drupal Module

This module integrates the [Heroicons](https://heroicons.com/) library into Drupal, providing a field type for selecting and displaying SVG icons with a modern, searchable interface.

## Features

- **Searchable Interface**: Catalyst-style combobox with real-time search across 1,176+ icons
- **SVG Previews**: 16×16px thumbnails of each icon in the dropdown for easy visual selection
- **Keyboard Navigation**: Full keyboard support with ↑↓ arrow keys, Enter, and Esc
- **React/Catalyst Powered**: Modern component library with Headless UI integration
- **Performance Optimized**: SVG sprite system for efficient icon loading
- **Accessibility**: ARIA compliant with screen reader support
- **Four Icon Styles**: Outline (24px), Solid (24px), Mini (20px), and Micro (16px)
- **Inline SVG Rendering**: Icons rendered as inline SVG for easy styling and manipulation

## Version 2.0 Highlights

✨ **New in v2.0**: Complete implementation overhaul with React and Catalyst UI
- Moved from Alpine.js to React with Catalyst UI components
- Enhanced UI/UX with Tailwind's design system components
- Improved accessibility through Headless UI React integration
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
- **Frontend**: React + Catalyst UI components + Headless UI
- **Performance**: ~70KB optimized UMD bundle (gzipped ~23KB)
- **Compatibility**: Respects Drupal Form API, no Ajax required
- **Fallback**: Hidden form inputs maintain compatibility
- **Building**: Uses Vite for optimized builds

### Browser Support
- Chrome/Edge 88+
- Firefox 78+  
- Safari 14+

## Development

### File Structure
```
heroicons/
├─ css/
│   ├─ heroicons-react-widget.css   # Catalyst-style component styling
│   └─ heroicons-sprite.css        # SVG sprite utilities
├─ src/
│   ├─ Plugin/Field/               # Drupal field plugins
│   └─ react/                      # React components
│       ├─ HeroiconsCombobox.jsx     # Main React component
│       └─ index.jsx               # Entry point for React
├─ dist/                          # Built JavaScript bundles (Vite output)
├─ icons/                        # Icon SVG files
├─ templates/                    # Twig templates
├─ combobox.jsx                  # Catalyst UI Combobox component
├─ package.json                  # NPM dependencies
└─ vite.config.js                # Build configuration
```

### Building the React Component

To modify the React component and rebuild:

```bash
cd web/modules/custom/heroicons
npm install   # Install dependencies
npm run build # Build the component
```

### Customization
The widget can be styled by overriding CSS variables and classes:

```css
/* Override main accent color */
:root {
  --catalyst-accent-color: #0891b2; /* Cyan 600 */
}
```

Key CSS classes:
- `.heroicons-react-widget` - Main container
- `[data-slot=input]` - Search input
- `[data-slot=options]` - Dropdown container
- `.heroicons-option` - Individual options
- `.heroicons-preview` - Icon previews

## Troubleshooting

**Icons not showing?**
- Clear Drupal caches: `drush cache:rebuild`
- Verify React loads in browser dev tools
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
