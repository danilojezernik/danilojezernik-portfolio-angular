import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject, catchError, finalize, of} from "rxjs";
import {MyGalleryService} from "../../../../../services/api/my-gallery.service";
import {GetImageService} from "../../../../../services/get-image/get-image.service";
import {GoBackComponent} from "../../../../../shared/components/go-back/go-back.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {ClipboardCopyService} from "../../../../../services/clipboard-copy/clipboard-copy.service";

/**
 * @Component AboutMeMediaAdminComponent
 * Component for managing media files.
 * Allows viewing, uploading, and deleting images.
 */
@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, GoBackComponent, BreadcrumbAdminComponent],
  templateUrl: './about-me-media-admin.component.html'
})
export class AboutMeMediaAdminComponent implements OnInit {

  // Inject MyGalleryService to interact with backend services for media management
  protected _myGalleryService = inject(MyGalleryService);
  protected _getImageService = inject(GetImageService)

  // Inject services to copy image name to clipboard
  private _clipboardService = inject(ClipboardCopyService)

  // BehaviorSubject to keep track of images and their observable stream
  private _imageSubject = new BehaviorSubject<{ images: string[] }>({images: []});
  images$ = this._imageSubject.asObservable();

  // BehaviorSubject to track the status of file uploads
  private _uploadStatusSubject = new BehaviorSubject<string | null>(null);
  uploadStatus$ = this._uploadStatusSubject.asObservable();

  // Boolean to track loading state
  loading = false;

  // Property to store any error messages
  error: string | null = null;

  // Property to store the selected file for upload
  selectedFile: File | null = null;

  /**
   * @method ngOnInit
   * Lifecycle hook that gets called after the component is initialized.
   * It triggers fetching all images.
   */
  ngOnInit(): void {
    this.getAllImages();
  }

  /**
   * @method getAllImages
   * Fetches all images from the MyGalleryService and updates the BehaviorSubject.
   * Sets loading state and handles errors gracefully.
   */
  getAllImages(): void {
    this.loading = true; // Set loading state to true before making the API call

    this._myGalleryService.getAllImages().pipe(
      catchError(error => {
        // Capture and display error message
        this.error = error.message;
        // Return an empty array to handle errors gracefully
        return of({images: []});
      }),
      finalize(() => this.loading = false) // Ensure loading state is reset after completion
    ).subscribe(images => {
      // Update the BehaviorSubject with the fetched images
      this._imageSubject.next(images);
    });
  }

  /**
   * @method onFileChange
   * Handles file input change event.
   * Stores the selected file for upload.
   * @param event - Event object from the file input
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Check if files are selected
    if (input.files && input.files.length > 0) {
      // Set the selected file
      this.selectedFile = input.files[0];
    }
  }

  /**
   * @method upload
   * Uploads the selected file to the server and updates the upload status.
   * Refreshes the list of images after a successful upload.
   */
  upload(): void {
    if (this.selectedFile) {
      // Set upload status to "Uploading..."
      this._uploadStatusSubject.next('Uploading...');

      this._myGalleryService.uploadImage(this.selectedFile).pipe(
        catchError(error => {
          // Set upload status to error message if upload fails
          this._uploadStatusSubject.next(`Upload failed: ${error.message}`);
          // Return null to handle errors gracefully
          return of(null);
        }),
        finalize(() => {
          // Refresh the list of images and clear selected file after upload
          this.getAllImages();
          this.selectedFile = null;
        })
      ).subscribe(() => {
        // Set upload status to "Upload successful!" after a successful upload
        this._uploadStatusSubject.next('Upload successful!');
      });
    } else {
      // Set upload status to indicate no file was selected
      this._uploadStatusSubject.next('No file selected');
    }
  }

  /**
   * @method deleteImage
   * Deletes an image by its filename.
   * Refreshes the list of images after successful deletion.
   * @param filename - The name of the image file to delete
   */
  deleteImage(filename: string): void {
    const yes = confirm(`Ali res želiš izbrisati sliko: ${filename}?`)

    if (yes) {
      this._myGalleryService.deleteImageByName(filename).pipe(
        catchError(error => {
          // Capture and display error message
          this.error = error.message;
          // Return null to handle errors gracefully
          return of(null);
        })
      ).subscribe(() => {
        // Refresh the list of images after deletion
        this.getAllImages();
      });
    }

    return
  }

  copyToClipboard(img: string) {
    this._clipboardService.copyImageName(img)
  }
}