import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: WebSocket;

  connect(username: string): void {
    this.socket = new WebSocket(`${environment.websocketUrl}`);

    this.socket.onopen = () => {
      console.log('WebSocket connection opened');
      // Send the username as the first message after connecting
      this.socket.send(username);
    }

    this.socket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
    }

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    }
  }

  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  close(): void {
    this.socket.close();
  }
}
