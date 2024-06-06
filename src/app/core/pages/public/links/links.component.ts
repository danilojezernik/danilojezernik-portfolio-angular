import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from "../../../../services/api/links.service";

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './links.component.html'
})
export class LinksComponent {

  _linksService = inject(LinksService)

  links$ = this._linksService.getAllLinks()

}
