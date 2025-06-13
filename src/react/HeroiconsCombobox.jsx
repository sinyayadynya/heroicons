import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Combobox, Transition, Listbox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { 
  RectangleStackIcon, 
  Square3Stack3DIcon, 
  Squares2X2Icon, 
  Square2StackIcon 
} from '@heroicons/react/16/solid';

/**
 * Heroicon preview component following Catalyst pattern
 */
function IconPreview({ name, style }) {
  const [IconComponent, setIconComponent] = useState(null);
  
  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Convert kebab-case to PascalCase (e.g., "arrow-down" -> "ArrowDownIcon")
        const componentName = name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('') + 'Icon';
        
        let module;
        
        // Import from the appropriate heroicons package based on style
        if (style === 'outline') {
          module = await import('@heroicons/react/24/outline');
        } else if (style === 'solid') {
          module = await import('@heroicons/react/24/solid');
        } else if (style === 'mini') {
          module = await import('@heroicons/react/20/solid');
        } else if (style === 'micro') {
          module = await import('@heroicons/react/16/solid');
        } else {
          module = await import('@heroicons/react/24/outline'); // fallback
        }
        
        const Component = module[componentName];
        if (Component) {
          setIconComponent(() => Component);
        } else {
          setIconComponent(null);
        }
      } catch (error) {
        setIconComponent(null);
      }
    };
    
    loadIcon();
  }, [name, style]);
  
  // Return the icon component directly, following Catalyst pattern
  return IconComponent ? <IconComponent data-slot="icon" className="h-5 w-5" /> : null;
}

/**
 * Simple HeroiconsCombobox component
 */
function HeroiconsCombobox({ settings, container }) {
  const { allIcons = {}, value = '', style = 'outline' } = settings || {};
  
  const [currentStyle, setCurrentStyle] = useState(style);
  const [icons, setIcons] = useState([]);
  const [currentValue, setCurrentValue] = useState(value);

  // Update icons when style changes
  useEffect(() => {
    const styleIcons = allIcons[currentStyle] || [];
    setIcons(styleIcons);
  }, [currentStyle, allIcons]);

  // Initialize state and form inputs from props on mount
  useEffect(() => {
    // Set initial values from props
    if (value) {
      setCurrentValue(value);
    }
    if (style) {
      setCurrentStyle(style);
    }
    
    // Also update the form inputs with initial values immediately
    if ((value || style) && container) {
      updateFormInputs(value || '', style || 'outline');
    }
  }, []); // Empty deps array - only run on mount

  // Prepare options for combobox
  const options = icons.map(icon => ({
    id: icon.name,
    name: icon.name
  }));

  // Update hidden form inputs
  const updateFormInputs = useCallback((iconName, iconStyle) => {
    // Look for inputs in the parent element since React replaces the container content
    if (!container) return;
    
    // Get the parent element (the field wrapper) that contains both React container and hidden inputs
    const fieldWrapper = container.parentElement;
    if (!fieldWrapper) return;
    
    // Find inputs using data attributes in the field wrapper
    const iconNameInput = fieldWrapper.querySelector('input[data-heroicons-icon-name]');
    const iconStyleInput = fieldWrapper.querySelector('input[data-heroicons-icon-style]');
    
    if (iconNameInput) {
      iconNameInput.value = iconName || '';
      iconNameInput.dispatchEvent(new Event('change', { bubbles: true }));
      iconNameInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (iconStyleInput) {
      iconStyleInput.value = iconStyle || 'outline';
      iconStyleInput.dispatchEvent(new Event('change', { bubbles: true }));
      iconStyleInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, [container]);

  // Handle selection with useCallback for performance
  const handleSelect = useCallback((selectedIcon) => {
    if (selectedIcon) {
      setCurrentValue(selectedIcon.name);
      updateFormInputs(selectedIcon.name, currentStyle);
      // Clear search query after selection to show the selected value
      setQuery('');
    }
  }, [currentStyle, updateFormInputs]);

  // Handle style change with useCallback for performance
  const handleStyleChange = useCallback((newStyle) => {
    setCurrentStyle(newStyle);
    // Update form input for style
    updateFormInputs(currentValue, newStyle);
  }, [currentValue, updateFormInputs]);

  // Handle query change with useCallback for performance
  const handleQueryChange = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  // Find selected option
  const selectedOption = options.find(o => o.name === currentValue) || null;

  const [query, setQuery] = useState('');

  // Memoize filtered options for performance
  const filteredOptions = useMemo(() => {
    if (query === '') return options;
    return options.filter((option) =>
      option.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  return (
    <div className="space-y-4">
      {/* Horizontal layout for icon and style selectors */}
      <div className="grid grid-cols-2 gap-4">
        {/* Icon combobox */}
        <div>
          <label className="component-label">
            Icon
          </label>
          
          <Combobox value={selectedOption} onChange={handleSelect}>
            <div className="relative" style={{ zIndex: 1000 }}>
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-10 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(option) => {
                    // If we have a selected option, show its name
                    if (option?.name) return option.name;
                    // If we have a currentValue but no option yet (still loading), show the value
                    if (currentValue && !selectedOption) return currentValue;
                    // Otherwise return empty string
                    return '';
                  }}
                  onChange={handleQueryChange}
                  placeholder="Search icons..."
                />
                
                {/* Selected icon inside the input */}
                {(currentValue && !query) && (
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IconPreview name={currentValue} style={currentStyle} />
                  </div>
                )}
                
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                  {filteredOptions.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <Combobox.Option
                        key={option.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-4 ${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                          }`
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <div className="flex items-center gap-3">
                            <IconPreview name={option.name} style={currentStyle} />
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {option.name}
                            </span>
                            {selected && (
                              <CheckIcon className="ml-auto h-4 w-4" aria-hidden="true" />
                            )}
                          </div>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        {/* Horizontal style selector */}
        <div>
          <label className="component-label">
            Style
          </label>
          <div className="flex rounded-lg border border-gray-300 bg-white overflow-hidden shadow-md">
            {[
              { value: 'outline', label: 'Outline' },
              { value: 'solid', label: 'Solid' },
              { value: 'mini', label: 'Mini' },
              { value: 'micro', label: 'Micro' }
            ].map((styleOption, index) => (
              <button
                key={styleOption.value}
                type="button"
                onClick={() => handleStyleChange(styleOption.value)}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                  currentStyle === styleOption.value
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${
                  index > 0 ? 'border-l border-gray-300' : ''
                }`}
              >
                {styleOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroiconsCombobox;
