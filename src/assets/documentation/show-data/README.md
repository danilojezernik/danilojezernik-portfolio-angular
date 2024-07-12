# Show Data Component

The `ShowDataComponent` is designed to easily add and display various types of data inputs. It uses Angular's standalone component feature and imports `CommonModule` for common directives.

## Overview

The `ShowDataComponent` allows you to bind various data properties to its inputs and display them in a standardized format. It is useful for displaying information like titles, categories, dates, and other metadata.

## Usage

### Example 1: Displaying Technology Data

This example demonstrates how to use the `ShowDataComponent` to display details about a technology item.

```html

<app-show-data
  [_id]="technology._id"
  [technology]="technology.technology"
  [title]="technology.title"
  [subtitle]="technology.subtitle"
  [datum_vnosa]="technology.datum_vnosa"
></app-show-data>
```

### Example 2: Displaying Blog Post Data

This example shows how to use the `ShowDataComponent` to display details about a blog post.

```html

<app-show-data
  [title]="blog.title"
  [kategorija]="blog.kategorija"
  [podnaslov]="blog.podnaslov"
></app-show-data>
```

## Component Code

### TypeScript

The `ShowDataComponent` class defines various inputs that correspond to different data fields. These inputs can be bound to data properties in your templates.

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

/**
 * This component is for easy adding any kind of data inputs and displaying them.
 * It uses Angular's standalone component feature and imports CommonModule for common directives.
 */
@Component({
  selector: 'app-show-data',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './show-data.component.html'
})
export class ShowDataComponent {
  @Input() _id?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() kategorija?: string;
  @Input() datum_vnosa?: string;
  @Input() technology?: string;
  // Other inputs can be added as needed
}
```

### HTML Template

The template for the `ShowDataComponent` displays the data fields if they are provided.

```html

<div *ngIf="_id">ID: {{ _id }}</div>
<div *ngIf="title">Title: {{ title }}</div>
<div *ngIf="subtitle">Subtitle: {{ subtitle }}</div>
<div *ngIf="kategorija">Kategorija: {{ kategorija }}</div>
<div *ngIf="datum_vnosa">Datum vnosa: {{ datum_vnosa | date }}</div>
<div *ngIf="technology">Technology: {{ technology }}</div>
<!-- Other fields can be added as needed -->
```

## Explanation

The `ShowDataComponent` is a flexible component designed to display various data fields. Each field corresponds to an `@Input` property that can be bound to data in your templates.

### Key Features:

- **Flexibility**: Supports a wide range of data fields, making it suitable for various data types.
- **Reusable**: Can be used across different parts of your application to display consistent data layouts.
- **Standalone**: Utilizes Angular's standalone component feature, making it easy to integrate.

By using the `ShowDataComponent`, you can ensure a consistent presentation of data across your application, reduce code duplication, and simplify the process of adding new data fields.
