import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GithubService } from "../../../../services/api/github.service"
import { catchError, map, Observable, of, BehaviorSubject } from "rxjs"
import { Repo } from "../../../../models/github.model"
import { TranslateModule, TranslateService } from "@ngx-translate/core"
import { MatSelectModule } from "@angular/material/select"
import { FormsModule } from "@angular/forms"
import { MatInputModule } from "@angular/material/input"
import { SELECT_LANGUAGE } from "../../../../shared/global-const/global.const"
import { switchMap } from 'rxjs/operators'
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { DropdownSelectComponent } from "../../../../shared/components/dropdown-select/dropdown-select.component";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {ShorteningTextPipe} from "../../../../pipes/shortening-text/shortening-text.pipe";
import {RouterLink} from "@angular/router";
import {SlovenianDateTransformPipe} from "../../../../pipes/date-transform/slovenian-date-transform.pipe";

/**
 * This component displays GitHub repositories fetched from the backend API.
 */
@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatSelectModule, FormsModule, MatInputModule, LoadingComponent, DropdownSelectComponent, HeroTitleComponent, ShorteningTextPipe, RouterLink, SlovenianDateTransformPipe],
  templateUrl: './github.component.html'
})
export class GithubComponent {

  // Injecting the necessary services for fetching GitHub repositories and handling translations
  private _githubService = inject(GithubService)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null

  /**
   * BehaviorSubject to store the selected language.
   * - BehaviorSubject is a special type of Observable that keeps hold of the current value and emits it to new subscribers.
   * - It is initialized with the value 'All languages' meaning initially all languages are selected.
   */
  private selectedLanguageSubject = new BehaviorSubject<string>('selected.language')

  /**
   * Combine the selected language and GitHub repositories to filter the data.
   * - 'switchMap' is used to switch to a new Observable each time the selected language changes.
   */
  filteredGitHub$: Observable<{ repos: Repo[], length: number }> = this.selectedLanguageSubject.pipe(
    switchMap(language => {
      // Fetch the GitHub repositories from the service
      return this._githubService.getGitHubRepo().pipe(
        // 'map' is used to transform the fetched repositories based on the selected language
        map(repos => {
          // Filter the repositories based on the selected language
          const filteredRepos = language === 'selected.language' ? repos : repos.filter(repo => repo.language === language)
          // Return the filtered repositories and their count
          return {
            repos: filteredRepos,
            length: filteredRepos.length
          }
        }),
        // 'catchError' is used to handle any errors that occur during the fetching process
        catchError((error) => {
          // Extract the error message
          const message = error.message
          // Translate the error message using the Translation service and set it to the error property
          this._translateService.get(message).subscribe((translation) => {
            this.error = translation
          })
          // Return an observable of an empty array and length of 0 to handle errors gracefully
          return of({ repos: [], length: 0 })
        })
      )
    })
  )

  /**
   * Property to bind the selected language in the template.
   * - This property is used to bind the selected language in the template and update the BehaviorSubject.
   */
  selectedLanguage: string = 'selected.language'

  /**
   * Method to update the selected language.
   * - When a new language is selected, it updates the value of the BehaviorSubject.
   * - This triggers the Observable stream to emit the new value.
   */
  setSelectedLanguage(language: string): void {
    this.selectedLanguageSubject.next(language)
  }

  /**
   * Method to handle change events from the dropdown.
   * - Casts the event target to HTMLSelectElement and updates the selected technology.
   */
  onSelectChange(language: string): void {
    this.setSelectedLanguage(language);
  }

  // Expose the constant array of selectable languages to the template
  protected readonly SELECT_LANGUAGE = SELECT_LANGUAGE
}
