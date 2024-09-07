import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatService} from "../../../services/api/chat.service";
import {FormsModule} from "@angular/forms";
import {LoadingComponent} from "../loading/loading.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, TranslateModule],
  templateUrl: './chat.component.html'
})
export class ChatComponent {

  userInput: string = ''
  response: string = ''
  loading: boolean = false

  private _chatService = inject(ChatService)

  sendQuestion() {
    if(!this.userInput) return
    this.response = '';  // Clear the previous response
    this.loading = true
    // Call the service to get the full response from the backend
    this._chatService.sendQuestion(this.userInput).subscribe((data: any) => {
      this.loading = false
      this.response = data.answer;  // Set the full response
    }, (error) => {
      this.loading = false
      console.error('Error', error);
    });
  }

  isChatOpen = false

  toggleChat() {
    this.isChatOpen = !this.isChatOpen
  }

  closeChat() {
    this.isChatOpen = false
  }
}
