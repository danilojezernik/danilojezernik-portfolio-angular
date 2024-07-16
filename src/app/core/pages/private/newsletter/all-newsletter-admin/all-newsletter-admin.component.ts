import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterService } from "../../../../../services/api/newsletter.service";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { Newsletter } from "../../../../../models/newsletter";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";

@Component({
  selector: 'app-all-newsletter-admin',
  standalone: true,
  imports: [ CommonModule, ButtonAdminComponent, GoBackComponent, ShowDataComponent ],
  templateUrl: './all-newsletter-admin.component.html'
})
export class AllNewsletterAdminComponent {

  private _newsletterService = inject(NewsletterService);
  private _dialog = inject(MatDialog);

  private _newsletterSubject = new BehaviorSubject<Newsletter[]>([]);


  newsletters$ = this._newsletterSubject.asObservable();
  newsletterById$!: Observable<Newsletter>;

  constructor() {
    this.getAllNewsletter();
  }

  getAllNewsletter() {
    this._newsletterService.getAllNewsletters().subscribe(newsletter => {
      this._newsletterSubject.next(newsletter);
    });
  }

  getNewsletterById(id: string) {
    this.newsletterById$ = this._newsletterService.getNewsletterById(id);
  }

  deleteNewsletter(id?: string) {
    if (id) {
      this._newsletterService.deleteNewsletterById(id).subscribe(() => {
        this.getAllNewsletter();
      });
    }
  }

  openDialog(id?: string) {
    if (id) {
      this.newsletterById$ = this._newsletterService.getNewsletterById(id);
      openDialogUtil(this._dialog, id, this.getNewsletterById.bind(this), this.newsletterById$, 'title', 'newsletter');
    }
  }
}
