import {AfterViewInit, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as Prism from 'prismjs';
import {RouterLink} from "@angular/router";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroTitleComponent],
  templateUrl: './documentation.component.html'
})
export class DocumentationComponent implements AfterViewInit {

  selectedSection = { category: 'starting', name: 'Getting started' };
  isSidebarOpen = false;

  starting = [
    'Getting started',
    'Documentation'
  ]

  frontend = [
    'documentation',
    'add-logs',
    'admin-buttons',
    'dropdown-selector',
    'http-error-interceptor',
    'ngx-translate',
    'open-dialog-utils',
    'order-service-localstorage',
    'page-private-public',
    'pagination',
    'reusable-form-add',
    'reusable-form-edit',
    'scrolling-technologies',
    'show-data',
    'show-hide-role',
    'style-framework',
  ];

  backend = [
    'arhitecture',
    'auth',
    'background-scheduler',
    'seed-drop-db',
    'websocket_fastapi',
  ];

  selectSection(category: string, section: string) {
    this.selectedSection = { category, name: section };
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebarOnMobile() {
    // Close sidebar if screen size is less than md
    if (window.innerWidth < 768) {
      this.isSidebarOpen = false;
    }
  }

  ngAfterViewInit() {
    Prism.highlightAll();
  }
}
