import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatService} from "../../../services/api/chat.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent {

  userInput: string = ''
  response: string = ''

  private _chatService = inject(ChatService)

  sendQuestion() {
    this.response = '';  // Clear the previous response

    // Call the service to get the full response from the backend
    this._chatService.sendQuestion(this.userInput).subscribe((data: any) => {
      this.response = data.answer;  // Set the full response
    }, (error) => {
      console.error('Error', error);
    });
  }

}
