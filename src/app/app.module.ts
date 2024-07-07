import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./core/header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from "./services/interceptor/interceptor.service";
import { CopyrightDirective } from './directives/copyright.directive';

@NgModule({
  declarations: [
    AppComponent,
    CopyrightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
