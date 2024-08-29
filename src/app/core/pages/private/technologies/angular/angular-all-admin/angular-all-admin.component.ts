import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {ButtonAdminComponent} from "../../../../../../shared/components/button-admin/button-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {ShowDataComponent} from "../../../../../../shared/components/show-data/show-data.component";
import {AngularService} from "../../../../../../services/api/angular.service";
import {GetImageService} from "../../../../../../services/get-image/get-image.service";
import {DialogAdminService} from "../../../../../../services/dialog-admin/dialog-admin.service";
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {Angular} from "../../../../../../models/angular.model";
import {BlogModel} from "../../../../../../models/blog.model";

@Component({
  selector: 'app-angular-all-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, ButtonAdminComponent, GoBackComponent, LoadingComponent, ShowDataComponent],
  templateUrl: './angular-all-admin.component.html'
})
export class AngularAllAdminComponent {

  private _angularService = inject(AngularService)
  protected _getImageByName = inject(GetImageService)
  private _openDialog = inject(DialogAdminService)
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null
  // Property to track loading state, initialized to false
  loading: boolean = false

  private _angularSubject = new BehaviorSubject<Angular[]>([])

  angular$ = this._angularSubject.asObservable()

  angularById$!: Observable<Angular>

  /**
   * Constructor to initialize the component.
   * Calls the getAllBlogs method to load all blog posts.
   */
  constructor() {
    this.getAllAngular()
  }

  /**
   * @method getAllAngular
   * Fetches all blogs from the BlogService and assigns them to blogs$.
   * Also handles loading state and error messages.
   */
  getAllAngular() {
    this.loading = true; // Set loading state to true before making the API call

    this._angularService.getAllAngularAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Angular[])
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(blog => {
      this.loading = false; // Set loading state to false after receiving the response
      this._angularSubject.next(blog); // Update the BehaviorSubject with the fetched blogs
    })
  }

  /**
   * @method getAngularById
   * Fetches a single blog post by its ID from the BlogService and assigns it to blogById$.
   * @param id - ID of the blog post to fetch
   */
  getAngularById(id: string) {
    this.angularById$ = this._angularService.getAngularById(id)
  }

  /**
   * @method deleteBlog
   * Deletes a blog post by its ID.
   * After deletion, refreshes the list of blogs by calling getAllBlogs().
   * @param id - ID of the blog post to delete
   */
  deleteAngular(id?: string) {
    if (id) {
      this._angularService.deleteAngularById(id).subscribe(() => {
        this.getAllAngular(); // Refresh the list of blogs after deletion
      })
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to view or edit a blog by its ID.
   * Fetches the blog details and uses a utility function to open the dialog.
   * @param id - ID of the blog to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.angularById$ = this._angularService.getAngularById(id); // Fetch blog post details by ID
      this._openDialog.openDialogUtil(id, this.getAngularById.bind(this), this.angularById$, 'title', 'angular'); // Open dialog with fetched data
    }
  }
}
