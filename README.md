# Heroicons Drupal Module

A modern Drupal field type for selecting and displaying [Heroicons](https://heroicons.com/) with a searchable, user-friendly interface.

## Features

- **Searchable Interface**: Catalyst-style combobox with real-time search across 1,176+ icons
- **Visual Previews**: Real icon previews in the dropdown for easy visual selection
- **Keyboard Navigation**: Full keyboard support with ↑↓ arrow keys, Enter, and Esc
- **Modern UI**: Built with React, HeadlessUI, and Catalyst design patterns
- **Four Icon Styles**: Outline (24px), Solid (24px), Mini (20px), and Micro (16px)
- **Performance Optimized**: Dynamic icon loading with code-splitting
- **Accessibility**: ARIA compliant with screen reader support
- **Inline SVG Rendering**: Icons rendered as inline SVG for easy styling

## Requirements

- Drupal 10 or 11
- PHP extensions: `ext-dom` and `ext-libxml`
- Modern browser with JavaScript enabled

## Installation

1. Download and place the `heroicons` folder in `web/modules/custom/`
2. Navigate to **Extend** (`/admin/modules`) and enable the Heroicons module
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
5. **Style**: Choose from Outline, Solid, Mini, or Micro variants using the horizontal button group

### Display

Icons are automatically rendered as inline SVG elements, making them easy to style with CSS:

```css
/* Style all heroicons */
.heroicons-field svg {
  width: 2rem;
  height: 2rem;
  color: #3b82f6; /* Blue color */
}
```

## Technical Details

### Architecture
- **Frontend**: React 18 + HeadlessUI + Catalyst UI patterns
- **Build Tool**: Vite with optimized UMD output
- **Bundle Size**: ~200KB total (~48KB gzipped)
- **Compatibility**: Full Drupal Form API integration
- **Progressive Enhancement**: Works without JavaScript (graceful degradation)

### Browser Support
- Chrome/Edge 88+
- Firefox 78+  
- Safari 14+

## Development

### File Structure
```
heroicons/
├─ src/
│   ├─ Plugin/Field/               # Drupal field plugins
│   ├─ react/                      # React components
│   │   ├─ HeroiconsCombobox.jsx   # Main React widget
│   │   └─ index.jsx               # React initialization
│   └─ styles.css                  # Tailwind source
├─ dist/                          # Built assets (auto-generated)
├─ icons/                         # Heroicon SVG files
├─ templates/                     # Twig templates
├─ css/                          # Legacy CSS (being phased out)
├─ package.json                   # NPM dependencies
└─ vite.config.js                 # Build configuration
```

### Building the React Component

To modify the React component:

```bash
cd web/modules/custom/heroicons
npm install   # Install dependencies
npm run build # Build the component
```

### Customization

The widget uses TailwindCSS classes and can be customized by overriding styles:

```css
/* Override accent colors */
[data-heroicons-react-widget] {
  --color-blue-500: #0891b2; /* Custom blue */
}

/* Style the dropdown */
[data-heroicons-react-widget] .max-h-40 {
  max-height: 200px; /* Taller dropdown */
}
```

Key elements:
- `[data-heroicons-react-widget]` - Main container
- `.component-label` - Field labels within the widget
- `.grid-cols-2` - Icon/Style layout grid
- `.max-h-40` - Dropdown height constraint

## Troubleshooting

**Icons not showing?**
- Clear Drupal caches: `drush cache:rebuild`
- Check browser console for JavaScript errors
- Verify React dependencies load correctly

**Search not working?**
- Ensure JavaScript is enabled
- Check browser compatibility
- Verify network connectivity for CDN resources

**Field label missing?**
- Check field configuration in Drupal admin
- Clear caches after configuration changes

## Contributing

Contributions welcome! Please ensure:
- Follow Drupal coding standards
- Test across supported browsers
- Update documentation for new features

## License

Licensed under [GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html).