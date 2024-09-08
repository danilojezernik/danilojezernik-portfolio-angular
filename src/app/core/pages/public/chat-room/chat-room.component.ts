import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {WebsocketService} from "../../../../services/websocket/websocket.service";

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-room.component.html'
})
export class ChatRoomComponent {
  username: string = '';
  message: string = '';
  messages: string[] = [];
  connected: boolean = false;

  constructor(private webSocketService: WebsocketService) {}

  connect(): void {
    if (this.username) {
      this.webSocketService.connect(this.username);
      this.connected = true;
      this.listenForMessages();
    }
  }

  send(): void {
    this.webSocketService.sendMessage(this.message);
    this.message = '';
  }

  listenForMessages(): void {
    this.webSocketService.socket.onmessage = (event) => {
      this.messages.push(event.data);
    }
  }
}
