import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShorteningTextPipe} from "../../../pipes/shortening-text/shortening-text.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-dev-news-component',
  standalone: true,
  imports: [CommonModule, ShorteningTextPipe, TranslateModule, LoadingComponent],
  templateUrl: './dev-news-component.component.html'
})
export class DevNewsComponentComponent {

  @Input() newsData: any[] | null = null;
  @Input() error: string | null = null;

}
