## Admin Buttons

This section describes the reusable button component used in the admin panel for various actions such as adding, editing, reading, and deleting data.

### Reusable Button Component

The `ButtonAdminComponent` is a versatile and reusable component designed to handle different button actions in the admin panel. This component uses Angular's `@Input` and `@Output` decorators to make it highly configurable and extensible.

#### Component Code

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BUTTONS } from "path-to-global.const";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

/**
 * Component decorator to define metadata for the ButtonAdminComponent
 */
@Component({
  selector: 'app-button-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, TranslateModule ],
  templateUrl: './button-admin.component.html'
})
export class ButtonAdminComponent {

  // Input property to receive the router link for the button
  @Input() routerLink?: string;

  // Input property to receive an array of router link IDs for the button
  @Input() routerLinkId?: string[];

  // Output event emitter for the dialogRead event
  @Output() dialogRead = new EventEmitter<void>();

  // Output event emitter for the delete event
  @Output() delete = new EventEmitter<void>();

  // Method to emit the dialogRead event when the dialog is opened
  openDialog() {
    if (this.dialogRead) {
      this.dialogRead.emit();
    }
  }

  // Method to emit the delete event when delete action is triggered
  deleteData() {
    if (this.delete) {
      this.delete.emit();
    }
  }

  // Reference to BUTTONS constant for button labels
  protected readonly BUTTONS = BUTTONS;
}
```

### Template Code

The HTML template for `ButtonAdminComponent` includes buttons for different actions such as add, edit, read, and delete. These buttons are conditionally rendered based on the input properties provided.

```angular2html

<ng-container *ngIf="routerLink">
  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" [routerLink]="routerLink">
    {{ BUTTONS.add | translate }}
  </button>
</ng-container>

<ng-container *ngIf="routerLinkId">
  <button class="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" [routerLink]="routerLinkId">
    {{ BUTTONS.edit | translate }}
  </button>
  <button class="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" (click)="openDialog()">
    {{ BUTTONS.read | translate }}
  </button>
  <button class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" (click)="deleteData()">
    {{ BUTTONS.delete | translate }}
  </button>
</ng-container>
```

### Using the ButtonAdminComponent

Below is an example of how to use the `ButtonAdminComponent` in a parent component. This example shows how to configure the component for adding a new user and managing existing users.

#### Example Usage in Parent Component

```angular2html

<app-button-admin [routerLink]="'/path-to-router-link'"></app-button-admin>

<ng-container *ngIf="users$ | async as users">
  <div *ngFor="let user of users; let i = index">

    <app-show-data
      [_id]="user._id"
    <!-- And other data fields as needed -->
    ></app-show-data>

    <app-button-admin
      (dialogRead)="openDialog(user._id)"
      [routerLinkId]="['/router-link-path', user._id ?? '']"
      (delete)="deleteUser(user._id)"
    ></app-button-admin>

  </div>
</ng-container>
```

### Explanation

- **Adding a New User**: The `app-button-admin` component is configured with a `routerLink` to navigate to the `add-user-admin` page.
- **Managing Existing Users**: For each user, the `app-show-data` component displays user information. The `app-button-admin` component is configured with `routerLinkId` and emits `dialogRead` and `delete` events for reading and deleting user data.
