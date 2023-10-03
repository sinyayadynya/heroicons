function updatePreview() {
    // Alpine.js code to update the icon preview
    let iconName = this.iconName;
    let iconStyle = this.iconStyle;

    // Generate the path to the SVG based on the selected name and style
    let iconPath = `/modules/custom/heroicons/icons/${iconStyle}/${iconName}.svg`;

    // Fetch and update the SVG in the preview element
    fetch(iconPath)
        .then((response) => response.text())
        .then((svg) => {
            this.iconPreview = svg;
        });
}
