import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {Vue} from "../../../../../../models/vue.model";
import {VueService} from "../../../../../../services/api/vue.service";
import {OrderService} from "../../../../../../utils/local-storage/order-service";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-vue-all-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, ButtonAdminComponent, GoBackComponent, LoadingComponent, ShowDataComponent, CdkDropList, CdkDrag],
  templateUrl: './vue-all-admin.component.html'
})
export class VueAllAdminComponent {

  // Injected services for managing Vue data, retrieving images, opening dialogs, and translating messages
  private _vueService = inject(VueService); // Service for managing Vue data
  protected _getImageByName = inject(GetImageService); // Service for retrieving images by name
  private _openDialog = inject(DialogAdminService); // Service for opening dialog windows
  private _translateService = inject(TranslateService); // Service for translating error messages
  private _orderService = inject(OrderService)

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  // Subject to store the list of Vue items
  private _vueSubject = new BehaviorSubject<Vue[]>([]);

  // Observable that provides the list of Vue items to the template
  vue$ = this._vueSubject.asObservable();

  // Observable to store a single Vue item fetched by ID
  vueById$!: Observable<Vue>;

  // To get _id from drag and drop CDK functionality
  vue: Vue[] = []

  /**
   * Constructor to initialize the component.
   * Automatically loads all Vue items when the component is created.
   */
  constructor() {
    this.getAllVue();
  }

  /**
   * Drag and drop functionality and save indexes to local storage so that when reorganized, position will be stored to localstorage.
   */
  drop(event: CdkDragDrop<Vue[]>) {
    moveItemInArray(this.vue, event.previousIndex, event.currentIndex);
    this._orderService.saveOrderToLocalStorage(this.vue, 'vueOrder', '_id')
  }

  /**
   * Remove order from local storage
   */
  removeOrder() {
    this._orderService.clearBlogsFromLocalStorage('vueOrder')
  }

  /**
   * @method getAllVue
   * Fetches all Vue items from the VueService and updates the vue$ observable.
   * Handles loading state and error messages.
   */
  getAllVue() {
    this.loading = true; // Set loading state to true before making the API call

    this._vueService.getAllVueAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message;
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Vue[]);
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(vue => {
      this.vue = vue;
      this._orderService.applySavedOrder(this.vue, 'vueOrder', '_id')
      this.loading = false; // Set loading state to false after receiving the response
      this._vueSubject.next(vue); // Update the BehaviorSubject with the fetched Vue items
    });
  }

  /**
   * @method getVueById
   * Fetches a single Vue item by its ID from the VueService and assigns it to vueById$.
   * @param id - ID of the Vue item to fetch
   */
  getVueById(id: string) {
    this.vueById$ = this._vueService.getVueById(id);
  }

  /**
   * @method deleteVue
   * Deletes a Vue item by its ID.
   * After deletion, refreshes the list of Vue items by calling getAllVue().
   * @param id - ID of the Vue item to delete
   */
  deleteVue(id?: string) {
    if (id) {
      this._vueService.deleteVueById(id).subscribe(() => {
        this.getAllVue(); // Refresh the list of Vue items after deletion
      });
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to view or edit a Vue item by its ID.
   * Fetches the item details and uses a utility function to open the dialog.
   * @param id - ID of the Vue item to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.vueById$ = this._vueService.getVueById(id); // Fetch Vue item details by ID
      this._openDialog.openDialogUtil(id, this.getVueById.bind(this), this.vueById$, '_id', 'vue'); // Open dialog with fetched data
    }
  }

}
