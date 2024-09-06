import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./core/header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from "./interceptors/http-service-interceptor/interceptor.service";
import { CopyrightDirective } from './directives/copyright.directive';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpErrorInterceptor } from "./interceptors/http-error-interceptor/http-error.interceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import {FooterComponent} from "./core/footer/footer.component";
import { SlovenianDateTransformPipe } from './pipes/date-transform/slovenian-date-transform.pipe';
import localeSl from '@angular/common/locales/sl'

// Import Slovenian locale data and register the locale data
import {registerLocaleData} from "@angular/common";
import { NotAuthorizedComponent } from './core/pages/public/not-authorized/not-authorized.component';
import { ShorteningTextPipe } from './pipes/shortening-text/shortening-text.pipe';
import { DialogSendEmailComponent } from './shared/components/dialogs/dialog-send-email/dialog-send-email.component';
import {ReusableFormAddComponent} from "./shared/forms/reusable-form-add/reusable-form-add.component";
import {AngularEditorModule} from "@kolkov/angular-editor";
registerLocaleData(localeSl, 'sl-SI')

@NgModule({
  declarations: [
    AppComponent,
    NotAuthorizedComponent,
    DialogSendEmailComponent
  ],
  imports: [
    AngularEditorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    CopyrightDirective,
    SlovenianDateTransformPipe,
    ShorteningTextPipe,

    // ngx-translate and the loader module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FooterComponent,
    ReusableFormAddComponent

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'sl-SI'
    }
  ],
  exports: [
    CopyrightDirective,
    SlovenianDateTransformPipe,
    ShorteningTextPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
