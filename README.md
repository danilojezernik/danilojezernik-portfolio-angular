# Angular and Tailwind CSS Project Setup

This README provides a step-by-step guide to set up an Angular project and integrate Tailwind CSS, including the Flowbite library for enhanced UI components.

## Getting Started with Angular

### 1. Create Your Angular Project
Start by creating a new Angular project using the Angular CLI.

```bash
ng new my-project
cd my-project
```

### 2. Install Tailwind CSS
Install Tailwind CSS along with PostCSS and Autoprefixer.

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 3. Configure Tailwind SCSS
Configure the `tailwind.config.js` file to include the paths to your Angular template files.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Add Tailwind Directives
Add the Tailwind CSS directives to your main SCSS/CSS file, typically `src/styles.scss`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Start Your Angular Project
Run your Angular project to start the build process.

```bash
ng serve
```

### 6. Use Tailwind in Your Project
You can now use Tailwind’s utility classes in your Angular components.

```html
<!-- src/app/app.component.html -->
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
```

## Adding Flowbite to Your Angular Project

### 1. Install Flowbite
Install Flowbite to add interactive UI components to your project.

```bash
npm install flowbite
```

### 2. Configure Tailwind to Include Flowbite
Update your `tailwind.config.js` to require the Flowbite plugin and include Flowbite's template paths.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
```

### 3. Initialize Flowbite in Angular
Import and initialize Flowbite in your main component to enable its interactive features.

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}
```

Now you can start using Flowbite components in your Angular project. Check the Flowbite documentation for examples and further customization options:
[Flowbite](https://flowbite.com/)
