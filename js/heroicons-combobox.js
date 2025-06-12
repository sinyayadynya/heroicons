/**
 * @file
 * Heroicons Combobox Alpine.js component.
 */

/* global Alpine */

function heroiconsCombobox(settings) {
  return {
    // Initial state
    open: false,
    query: '',
    allIcons: settings.allIcons || {}, // {outline: [...], solid: [...], mini: [...], micro: [...]}
    selected: settings.value || null,
    currentStyle: settings.style || 'outline',
    activeIndex: -1,

    // Computed properties
    get icons() {
      return this.allIcons[this.currentStyle] || [];
    },

    get filtered() {
      if (!this.query) return this.icons;
      return this.icons.filter((icon) =>
        icon.name.toLowerCase().includes(this.query.toLowerCase())
      );
    },

    get displayValue() {
      return this.selected ? this.selected : this.query;
    },

    get currentStyleInfo() {
      const styleMap = {
        'outline': { size: '24', style: 'outline' },
        'solid': { size: '24', style: 'solid' },
        'mini': { size: '20', style: 'solid' },
        'micro': { size: '16', style: 'solid' }
      };
      return styleMap[this.currentStyle] || styleMap['outline'];
    },

    // Methods
    init() {
      this.$watch('query', () => {
        this.activeIndex = -1;
      });
      
      this.$watch('currentStyle', () => {
        this.activeIndex = -1;
        // If current selection is not available in new style, clear it
        if (this.selected && !this.icons.some(icon => icon.name === this.selected)) {
          this.selected = null;
          this.query = '';
          this.$refs.inputIcon.value = '';
          this.$refs.inputIcon.dispatchEvent(new Event('input', {bubbles: true}));
        }
      });
    },

    choose(icon) {
      this.selected = icon.name;
      this.query = icon.name;
      this.open = false;
      this.activeIndex = -1;

      // Write back to hidden input so Drupal picks it up
      this.$refs.inputIcon.value = icon.name;
      this.$refs.inputIcon.dispatchEvent(new Event('input', {bubbles: true}));
    },

    openCombobox() {
      this.open = true;
    },

    closeCombobox() {
      this.open = false;
      this.activeIndex = -1;
    },

    handleKeydown(event) {
      const filteredItems = this.filtered;
      
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.activeIndex = Math.min(this.activeIndex + 1, filteredItems.length - 1);
          this.scrollToActiveItem();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.activeIndex = Math.max(this.activeIndex - 1, 0);
          this.scrollToActiveItem();
          break;
        case 'Enter':
          event.preventDefault();
          if (this.activeIndex >= 0 && filteredItems[this.activeIndex]) {
            this.choose(filteredItems[this.activeIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          this.closeCombobox();
          this.$refs.searchInput.blur();
          break;
        case 'Tab':
          this.closeCombobox();
          break;
      }
    },

    scrollToActiveItem() {
      this.$nextTick(() => {
        // Use virtual scroll-aware scrolling
        this.scrollIntoView(this.activeIndex);
      });
    },

    handleInputFocus() {
      this.openCombobox();
    },

    handleInputBlur() {
      // Small delay to allow clicks on options to work
      setTimeout(() => {
        this.closeCombobox();
      }, 150);
    },

    getIconSvgPath(iconName, style) {
      const styleInfo = this.currentStyleInfo;
      return `#hi-${styleInfo.style}-${iconName}`;
    },

    handleStyleChange() {
      // Update current style from the select element
      if (this.$refs.styleSelect) {
        this.currentStyle = this.$refs.styleSelect.value;
      }
    },

    getVirtualIndex(icon) {
      // Get the original index of an icon in the filtered array
      // This is needed for virtual scrolling to maintain correct activeIndex
      return this.filtered.findIndex(item => item.name === icon.name);
    },

    scrollIntoView(idx) {
      // Ensure active item is visible in virtual scroll container
      const rowHeight = 40; // Updated to match new height
      const rowTop = idx * rowHeight;
      const rowBottom = rowTop + rowHeight;
      const list = this.$refs.optionsList;
      
      if (!list) return;
      
      if (rowTop < list.scrollTop) {
        list.scrollTop = rowTop;
      }
      if (rowBottom > list.scrollTop + list.clientHeight) {
        list.scrollTop = rowBottom - list.clientHeight;
      }
    }
  };
}

// Register Alpine component when Alpine is available
document.addEventListener('alpine:init', () => {
  Alpine.data('heroiconsCombobox', heroiconsCombobox);
});