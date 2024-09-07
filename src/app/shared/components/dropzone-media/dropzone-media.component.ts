import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-dropzone-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropzone-media.component.html'
})
export class DropzoneMediaComponent {

  private _uploadStatusSubject = new BehaviorSubject<string | null>(null);
  uploadStatus$ = this._uploadStatusSubject.asObservable();

  selectedFile: File | null = null;
  @Output() fileUploaded = new EventEmitter<File>();

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (this.selectedFile) {
      this.fileUploaded.emit(this.selectedFile);
    }
  }
}
