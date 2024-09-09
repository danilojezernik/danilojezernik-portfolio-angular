import {Component, inject, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {AuthService} from "./auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {LoggedInService} from "./services/communication/logged-in.service";
import {WebsocketService} from "./services/websocket/websocket.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {SNACKBAR_MESSAGES} from "./shared/global-const/global.const";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _loggedInService = inject(LoggedInService);
  private _authService = inject(AuthService);
  private _websocketService = inject(WebsocketService)
  private _snack = inject(MatSnackBar)
  private _translateService = inject(TranslateService)

  isDrawerOpen = false

  isLoggedIn$!: Observable<boolean>;
  userRole: string
  userRoleSubscription!: Subscription;

  time: string
  username: string = '';
  message: string = '';
  messages: { username: string, message: string }[] = [];  // Store both username and message
  connected: boolean = false;

  ngOnInit(): void {
    initFlowbite();
    this.isLoggedIn$ = this._loggedInService.isLoggedIn$;
    this.time = new Date().toISOString()
    this.userRoleSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.userRole = this._authService.decodeRoleFromToken();
      } else {
        this.userRole = '';  // Clear the role on logout
      }
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen

  }

  connect(): void {
    // Check if the username is already taken
    if (this.messages.some(data => data.username === this.username)) {
      alert('This username is already taken. Please choose another one.');
      return;
    }

    if (this.username) {
      this._websocketService.connect(this.username);
      this.connected = true;
      this.listenForMessages();
    }
  }

  send(): void {
    this._websocketService.sendMessage(this.message);
    this.message = '';
  }

  listenForMessages(): void {
    this._websocketService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);  // Parse the JSON data

      // Check if there's an error (e.g., username is taken)
      if (data.error) {
        this._snack.open(this._translateService.instant(SNACKBAR_MESSAGES.userExists), '', {
          duration: 3000
        });
        this._websocketService.close();
        this.connected = false;
      } else {
        // Add the message to the chat
        this.messages.push({
          username: data.username,
          message: data.message
        });

        // If the message is a "user joined" notification, show it
        if (data.message.includes("has joined the chat")) {
          console.log(`${data.username} has joined the chat`);
        }
      }
    };
  }



}
