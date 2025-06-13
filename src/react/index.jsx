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
          
          if (!settings.heroicons?.[fieldName]?.[delta]) return;
          
          const widgetSettings = settings.heroicons[fieldName][delta];
          
          // Create React root and render component
          try {
            const root = ReactDOM.createRoot(container);
            root.render(<HeroiconsCombobox settings={widgetSettings} container={container} />);
            
            // Mark as initialized to prevent duplicate initialization
            container.setAttribute('data-react-initialized', 'true');
            // Widget initialized successfully
          } catch (error) {
            console.error('Heroicons: Failed to initialize React widget', error);
            
            // Fallback: show error message
            container.innerHTML = `
              <div class="heroicons-fallback" style="padding: 1rem; border: 1px solid #d1d5db; border-radius: 0.375rem; background-color: #f9fafb;">
                <strong>Icon Selector Unavailable</strong>
                <p>The interactive icon selector failed to load. Please refresh the page or contact your administrator.</p>
                <details style="margin-top: 0.5rem;">
                  <summary>Technical Details</summary>
                  <pre style="font-size: 0.75rem; margin-top: 0.5rem; color: #374151;">${error.toString()}</pre>
                </details>
              </div>
            `;
            
            // Mark as failed to prevent retry loops
            container.setAttribute('data-react-failed', 'true');
          }
        });
      }
    };
  }
})();

// Export for direct usage
export { HeroiconsCombobox };
