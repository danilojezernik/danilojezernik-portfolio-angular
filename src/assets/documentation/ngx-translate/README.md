# NGX-Translate Documentation

## Step 1: Add NGX-Translate to Your Angular Application

Install the necessary packages by running the following command in your terminal:

```sh
npm install @ngx-translate/core @ngx-translate/http-loader
```

- `@ngx-translate/core`: Contains the core routines for the translation, including the `TranslateService` and the translate pipe.
- `@ngx-translate/http-loader`: Dynamically loads translation files from your web server.

## Step 2: Set Up the TranslateModule and TranslateService

Configure the `TranslateModule` in your `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";

// Import ngx-translate and the HTTP loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from "./core/header/header.component";

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

    // ngx-translate and the loader module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
```

## Step 3: Configure the TranslateService

Update your `header.component.ts` to use the `TranslateService`:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink, TranslateModule ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  // Add the translate service to the constructor
  constructor(public translate: TranslateService) {
    // Set the default language and use it
    translate.setDefaultLang('en');
    // Use the default language
    translate.use('en');
  }

  // Method to change the language of the application
  useLanguage(language: string): void {
    this.translate.use(language);
  }

}
```

## Step 4: Create JSON Translation Files

Create translation files for each language in the `assets/i18n` directory:

```sh
assets/i18n/en.json
assets/i18n/si.json
```

Initially, you can create empty JSON files:

```json
{}
```

## Step 5: Add Translations Using BabelEdit

BabelEdit helps manage your translation files. After installing BabelEdit, drag and drop your `i18n` folder onto BabelEdit and configure your languages.

### Example Translations

**en.json:**

```json
{
  "demo": {
    "heading": "Translation Demo",
    "text": "This is a simple demonstration app for ngx-translate"
  }
}
```

**si.json:**

```json
{
  "demo": {
    "heading": "Demo prevod",
    "text": "To je preprosta predstavitvena aplikacija za ngx-translate"
  }
}
```

## Step 6: Use Translations in Templates and Code

### Using Translations in Templates

**header.component.html:**

```html
  <!-- Language toggle button: Shows button to switch to Slovenian if the current language is English - START -->
<button *ngIf="translate.currentLang === 'en'" (click)="useLanguage('si')">
  SI
</button>
<!-- Language toggle button: Shows button to switch to Slovenian if the current language is English - END -->

<!-- Language toggle button: Shows button to switch to English if the current language is Slovenian - START -->
<button *ngIf="translate.currentLang === 'si'" (click)="useLanguage('en')">
  EN
</button>
<!-- Language toggle button: Shows button to switch to English if the current language is Slovenian - END -->
```
