import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ CommonModule, TranslateModule ],
  templateUrl: './loading.component.html'
})
export class LoadingComponent {

}
