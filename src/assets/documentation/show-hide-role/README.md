# Show or hide an element to visitor or to everyone

### 1. Add auth service to the component:

```typescript
import {AuthService} from "path/auth.service";

_authService = inject(AuthService);
```

### 2. Add role to the .ts component:

```typescript
export class NameOfTheComponent implements OnInit {

  userRole: string

  ngOnInit(): void {
    this.userRole = this._authService.decodeRoleFromToken();
  }
}
```

### 3. add condition to .html component:

```angular2html
<ng-container *ngIf="userRole === '<role>'">
  Hide to registered visitors
</ng-container>

<ng-container *ngIf="userRole">
  Hide to all that are not registered
</ng-container>
```
