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
  [vsebina]="technology.subtitle"
  [datum_vnosa]="technology.datum_vnosa"
></app-show-data>
```

### Example 2: Displaying Blog Post Data

This example shows how to use the `ShowDataComponent` to display details about a blog post.

```html
<app-show-data
  [title]="blog['title']"
  [kategorija]="blog['kategorija']"
  [podnaslov]="blog['podnaslov']"
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
  @Input() naslov?: string;
  @Input() kategorija?: string;
  @Input() podnaslov?: string;
  @Input() vsebina?: string;
  @Input() image?: string;
  @Input() datum_vnosa?: string;
  @Input() title?: string;
  @Input() stack?: string;
  @Input() framework?: string;
  @Input() programming_language?: string;
  @Input() company?: string;
  @Input() employee?: boolean;
  @Input() tasks?: string;
  @Input() company_start?: string;
  @Input() company_end?: string;
  @Input() blog_id?: string;
  @Input() content?: string;
  @Input() author?: string;
  @Input() name?: string;
  @Input() surname?: string;
  @Input() email?: string;
  @Input() message?: string;
  @Input() link?: string;
  @Input() subtitle?: string;
  @Input() category?: string;
  @Input() github?: string;
  @Input() website?: string;
  @Input() confirmed?: boolean;
  @Input() username?: string;
  @Input() full_name?: string;
  @Input() profession?: string;
  @Input() technology?: string;
  @Input() description?: string;
  @Input() hashed_password?: string;
  @Input() registered?: boolean;
  @Input() blog_notification?: boolean;
  @Input() tehnologija?: string;
}
```

### HTML Template

The template for the `ShowDataComponent` displays the data fields if they are provided.

```html

<div *ngIf="_id">ID: {{ _id }}</div>
<div *ngIf="title">Title: {{ title }}</div>
<div *ngIf="naslov">Naslov: {{ naslov }}</div>
<div *ngIf="kategorija">Kategorija: {{ kategorija }}</div>
<div *ngIf="podnaslov">Podnaslov: {{ podnaslov }}</div>
<div *ngIf="vsebina">Vsebina: {{ vsebina }}</div>
<div *ngIf="image">Image: <img [src]="image" alt="Image"></div>
<div *ngIf="datum_vnosa">Datum vnosa: {{ datum_vnosa | date }}</div>
<div *ngIf="stack">Stack: {{ stack }}</div>
<div *ngIf="framework">Framework: {{ framework }}</div>
<div *ngIf="programming_language">Programming Language: {{ programming_language }}</div>
<div *ngIf="company">Company: {{ company }}</div>
<div *ngIf="employee !== undefined">Employee: {{ employee }}</div>
<div *ngIf="tasks">Tasks: {{ tasks }}</div>
<div *ngIf="company_start">Company Start: {{ company_start | date }}</div>
<div *ngIf="company_end">Company End: {{ company_end | date }}</div>
<div *ngIf="blog_id">Blog ID: {{ blog_id }}</div>
<div *ngIf="content">Content: {{ content }}</div>
<div *ngIf="author">Author: {{ author }}</div>
<div *ngIf="name">Name: {{ name }}</div>
<div *ngIf="surname">Surname: {{ surname }}</div>
<div *ngIf="email">Email: {{ email }}</div>
<div *ngIf="message">Message: {{ message }}</div>
<div *ngIf="link">Link: {{ link }}</div>
<div *ngIf="subtitle">Subtitle: {{ subtitle }}</div>
<div *ngIf="category">Category: {{ category }}</div>
<div *ngIf="github">GitHub: {{ github }}</div>
<div *ngIf="website">Website: {{ website }}</div>
<div *ngIf="confirmed !== undefined">Confirmed: {{ confirmed }}</div>
<div *ngIf="username">Username: {{ username }}</div>
<div *ngIf="full_name">Full Name: {{ full_name }}</div>
<div *ngIf="profession">Profession: {{ profession }}</div>
<div *ngIf="technology">Technology: {{ technology }}</div>
<div *ngIf="description">Description: {{ description }}</div>
<div *ngIf="hashed_password">Hashed Password: {{ hashed_password }}</div>
<div *ngIf="registered !== undefined">Registered: {{ registered }}</div>
<div *ngIf="blog_notification !== undefined">Blog Notification: {{ blog_notification }}</div>
<div *ngIf="tehnologija">Tehnologija: {{ tehnologija }}</div>
```

## Explanation

The `ShowDataComponent` is a flexible component designed to display various data fields. Each field corresponds to an `@Input` property that can be bound to data in your templates.

### Key Features:

- **Flexibility**: Supports a wide range of data fields, making it suitable for various data types.
- **Reusable**: Can be used across different parts of your application to display consistent data layouts.
- **Standalone**: Utilizes Angular's standalone component feature, making it easy to integrate.

By using the `ShowDataComponent`, you can ensure a consistent presentation of data across your application, reduce code duplication, and simplify the process of adding new data fields.
