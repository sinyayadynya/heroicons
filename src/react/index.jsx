import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles.css';
import HeroiconsCombobox from './HeroiconsCombobox';

/**
 * Initialize the Heroicons React widget
 */
(function attachHeroiconsWidget() {
  // Setup Drupal behavior for the widget
  if (typeof Drupal !== 'undefined') {
    Drupal.behaviors.heroiconsReactWidget = {
      attach: function (context, settings) {
        // Find all uninitialized widgets
        const widgets = document.querySelectorAll(
          '[data-heroicons-react-widget]:not([data-react-initialized])', 
          context
        );
        
        widgets.forEach(container => {
          // Get widget settings and ID
          const fieldName = container.dataset.fieldName;
          const delta = parseInt(container.dataset.delta, 10);
          
          if (!settings.heroicons || !settings.heroicons[fieldName] || !settings.heroicons[fieldName][delta]) {
            console.error(`Heroicons: Missing settings for ${fieldName}[${delta}]`);
            return;
          }
          
          const widgetSettings = settings.heroicons[fieldName][delta];
          
          // Create React root and render component
          try {
            const root = ReactDOM.createRoot(container);
            root.render(<HeroiconsCombobox settings={widgetSettings} container={container} />);
            
            // Mark as initialized to prevent duplicate initialization
            container.setAttribute('data-react-initialized', 'true');
            console.log(`Heroicons: React widget initialized for ${fieldName}[${delta}]`);
          } catch (error) {
            console.error('Heroicons: Failed to initialize React widget', error);
          }
        });
      }
    };
  }
})();

// Export for direct usage
export { HeroiconsCombobox };
