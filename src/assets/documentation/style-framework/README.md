# Styling Documentation

This project uses a combination of Tailwind CSS and custom SCSS styles for a flexible and maintainable styling solution.

## Tailwind CSS Setup

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs. The Tailwind setup is configured in the `styles.scss` file.

### Importing Tailwind CSS

In `styles.scss`, the Tailwind base, components, and utilities are imported:

```scss
/* You can add global styles to this file, and also import other style files */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Custom Styles

Alongside Tailwind CSS, custom styles are used to handle specific styling needs not covered by Tailwind. These styles are organized into various SCSS files and directories for better maintainability and scalability.

### Global Styles

Global styles are defined in the `global.scss` file. This file sets global settings for the entire application, such as resetting margins and setting default font styles.

**global.scss**

```scss
html, body {
  /* parameters */
}

body {
  /* parameters */
}
```

### Abstract Styles

Abstract styles include variables and mixins that can be reused throughout the application. These are stored in the `styles/abstract` directory.

#### Variables

**variables.scss**

```scss
// Define your color variables, font sizes, etc.
$primary-color: value;
$secondary-color: value;
$font-stack: value;
```

#### Mixins

Mixins are reusable blocks of styles that can be included in other styles. These are defined in the `mixin.scss` file.

### Animations

Animation styles are stored in the `styles/animation` directory. These define keyframe animations and other animation-related styles.

### Components

Component-specific styles are stored in the `styles/components` directory. These styles are scoped to individual components.

### Importing Custom Styles

All custom styles are imported into the main `styles.scss` file to be included in the application build.

**styles.scss**

```scss
@import "styles/abstract/variables";
@import "styles/abstract/mixin";
@import "styles/animation/spinner";
@import "styles/components/spinner/spinner";

// Global styles
@import "styles/global";
```

## Using Tailwind and Custom Styles

To use Tailwind CSS classes, simply add the class names directly in your templates. For custom styles, use the defined class names from your SCSS files.

## Conclusion

This setup leverages the utility-first approach of Tailwind CSS while allowing for custom styling needs through SCSS. The combination provides a scalable and maintainable approach to styling your Angular application.
