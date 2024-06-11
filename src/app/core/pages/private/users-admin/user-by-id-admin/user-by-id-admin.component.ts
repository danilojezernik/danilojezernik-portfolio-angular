import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../../../../../models/user";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-users-by-id-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent ],
  templateUrl: './user-by-id-admin.component.html'
})
export class UserByIdAdminComponent implements OnInit {

  private _userService = inject(UsersService)
  private _route = inject(ActivatedRoute)

  user$!: Observable<User>

  ngOnInit() {
    const userId = this._route.snapshot.paramMap.get('id') || ''

    if (userId)
      this.getUserById(userId)
  }

  getUserById(id: string) {
    this.user$ = this._userService.getUserByIdAdmin(id)
  }


}
