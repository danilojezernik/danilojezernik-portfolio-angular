import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsedLanguagesComponent} from "../../../../shared/components/used-languages/used-languages.component";

@Component({
  selector: 'app-stack-data',
  standalone: true,
  imports: [CommonModule, UsedLanguagesComponent],
  templateUrl: './stack-data.component.html'
})
export class StackDataComponent {

}
