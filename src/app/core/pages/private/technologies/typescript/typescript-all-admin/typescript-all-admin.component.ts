import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {ButtonAdminComponent} from "../../../../../../shared/components/button-admin/button-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {ShowDataComponent} from "../../../../../../shared/components/show-data/show-data.component";
import {GetImageService} from "../../../../../../services/get-image/get-image.service";
import {DialogAdminService} from "../../../../../../services/dialog-admin/dialog-admin.service";
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {TypescriptService} from "../../../../../../services/api/typescript.service";
import {TypeScript} from "../../../../../../models/typescript.model";
import {OrderService} from "../../../../../../utils/local-storage/order-service";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-typescript-all-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, ButtonAdminComponent, GoBackComponent, LoadingComponent, ShowDataComponent, CdkDropList, CdkDrag],
  templateUrl: './typescript-all-admin.component.html'
})
export class TypescriptAllAdminComponent {

  // Injected services for managing TypeScript data, retrieving images, opening dialogs, and translating messages
  private _typescriptService = inject(TypescriptService); // Service for managing TypeScript data
  protected _getImageByName = inject(GetImageService); // Service for retrieving images by name
  private _openDialog = inject(DialogAdminService); // Service for opening dialog windows
  private _translateService = inject(TranslateService); // Service for translating error messages
  private _orderService = inject(OrderService)

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  // Subject to store the list of TypeScript items
  private _typescriptSubject = new BehaviorSubject<TypeScript[]>([]);

  // Observable that provides the list of TypeScript items to the template
  typescript$ = this._typescriptSubject.asObservable();

  // Observable to store a single TypeScript item fetched by ID
  typescriptById$!: Observable<TypeScript>;

  typescript: TypeScript[] = []

  /**
   * Constructor to initialize the component.
   * Automatically loads all TypeScript items when the component is created.
   */
  constructor() {
    this.getAllTypeScript();
  }

  /**
   * Drag and drop functionality and save indexes to local storage so that when reorganized, position will be stored to localstorage.
   */
  drop(event: CdkDragDrop<TypeScript[]>) {
    moveItemInArray(this.typescript, event.previousIndex, event.currentIndex);
    this._orderService.saveOrderToLocalStorage(this.typescript, 'typescriptOrder', '_id')
  }

  /**
   * Remove order from local storage
   */
  removeOrder() {
    this._orderService.clearBlogsFromLocalStorage('typescriptOrder')
  }

  /**
   * @method getAllTypeScript
   * Fetches all TypeScript items from the TypescriptService and updates the typescript$ observable.
   * Handles loading state and error messages.
   */
  getAllTypeScript() {
    this.loading = true; // Set loading state to true before making the API call

    this._typescriptService.getAllTypescriptAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message;
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as TypeScript[]);
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(items => {
      this.typescript = items
      this._orderService.applySavedOrder(this.typescript, 'typescriptOrder', '_id')
      this.loading = false; // Set loading state to false after receiving the response
      this._typescriptSubject.next(items); // Update the BehaviorSubject with the fetched TypeScript items
    });
  }

  /**
   * @method getTypeScriptById
   * Fetches a single TypeScript item by its ID from the TypescriptService and assigns it to typescriptById$.
   * @param id - ID of the TypeScript item to fetch
   */
  getTypeScriptById(id: string) {
    this.typescriptById$ = this._typescriptService.getTypescriptById(id);
  }

  /**
   * @method deleteTypeScript
   * Deletes a TypeScript item by its ID.
   * After deletion, refreshes the list of TypeScript items by calling getAllTypeScript().
   * @param id - ID of the TypeScript item to delete
   */
  deleteTypeScript(id?: string) {
    if (id) {
      this._typescriptService.deleteTypescriptById(id).subscribe(() => {
        this.getAllTypeScript(); // Refresh the list of TypeScript items after deletion
      });
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to view or edit a TypeScript item by its ID.
   * Fetches the item details and uses a utility function to open the dialog.
   * @param id - ID of the TypeScript item to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.typescriptById$ = this._typescriptService.getTypescriptById(id); // Fetch TypeScript item details by ID
      this._openDialog.openDialogUtil(id, this.getTypeScriptById.bind(this), this.typescriptById$, '_id', 'typescript'); // Open dialog with fetched data
    }
  }
}
