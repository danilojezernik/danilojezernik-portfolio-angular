import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
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
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

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


  ngAfterViewInit() {
    this.initializeMatrixRain();
  }

  initializeMatrixRain() {
    // Getting the canvas
    const c = document.getElementById("x") as HTMLCanvasElement;
    const ctx = c.getContext("2d");

    // Making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    // Characters (asserting matrix is an array of strings)
    let matrix: string[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");

    const font_size = 10;
    const columns = c.width / font_size; // Number of columns for the rain
    const drops: number[] = []; // Array of drops - one per column

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * c.height / font_size); // Start from random Y positions
    }

    // Drawing the characters
    function draw() {
      // Check if ctx is not null
      if (ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)"; // Black BG for the canvas
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "#700428"; // Color for the text
        ctx.font = font_size + "px arial";

        for (let i = 0; i < drops.length; i++) {
          const text = matrix[Math.floor(Math.random() * matrix.length)];
          ctx.fillText(text, i * font_size, drops[i] * font_size);

          // Reset drop randomly after it has crossed the screen
          if (drops[i] * font_size > c.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          // Increment Y coordinate
          drops[i]++;
        }
      }
    }
    draw();
    setInterval(draw, 35);
  }

}
