import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsedLanguagesService} from "../../../../services/api/used-languages.service";
import {BreadcrumbAdminComponent} from "../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {SlovenianDateTransformPipe} from "../../../../pipes/date-transform/slovenian-date-transform.pipe";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {LanguageData} from "../../../../models/language-data";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";

@Component({
  selector: 'app-language-data',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, SlovenianDateTransformPipe, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './language-data.component.html'
})
export class LanguageDataComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'tag', 'count', 'last_updated'];
  dataSource = new MatTableDataSource<LanguageData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private _languageDataService = inject(UsedLanguagesService);

  ngOnInit() {
    // Fetch data from the service
    this._languageDataService.getLanguagesAdmin().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
