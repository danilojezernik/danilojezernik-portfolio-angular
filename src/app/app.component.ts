import { Component, OnInit } from '@angular/core';
import { initFlowbite } from "flowbite";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  /*
  * Imported and initialization of Flowbite in main component to enable its interactive features
  */
  ngOnInit(): void {
    initFlowbite();
  }
}
