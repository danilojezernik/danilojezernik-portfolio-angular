import { Component, OnInit } from '@angular/core';
import { initFlowbite } from "flowbite";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  /*
  * Imported and initialization of Flowbite in main component to enable its interactive features
  */
  ngOnInit(): void {
    initFlowbite();
  }
}
