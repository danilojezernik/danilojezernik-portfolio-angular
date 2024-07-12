import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from "../../../../services/api/github.service";
import { catchError, map, Observable, of } from "rxjs";
import { Repo } from "../../../../models/github.model";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

/**
 * This component displays GitHub repositories fetched from the backend API.
 */
@Component({
  selector: 'app-github',
  standalone: true,
  imports: [ CommonModule, TranslateModule ],
  templateUrl: './github.component.html'
})
export class GithubComponent {

  /**
   * Injected services:
   * @private _githubService: Service for fetching GitHub repositories
   * @private _translateService: Service for handling translations
   */
  private _githubService = inject(GithubService);
  private _translateService = inject(TranslateService);

  /**
   * Error message property to store error messages.
   */
  error: string | null = null;

  /**
   * Observable to fetch and map GitHub repositories from the backend API.
   *
   * @returns an observable that emits an object containing a list of repositories and their count.
   */
  github$: Observable<{ repos: Repo[]; length: number }> = this._githubService.getGitHubRepo().pipe(
    map(repos => ({
        repos: repos.map(repo => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          owner: repo.owner,
          html_url: repo.html_url,
          description: repo.description,
          language: repo.language
        })),
        length: repos.length
      })
    ),
    catchError((error) => {
      const message = error.message;

      /**
       * Translate the error message using the Translation service and set it to the error property.
       */
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      /**
       * Return an observable of an empty array and length of 0 to handle errors gracefully.
       */
      return of({ repos: [], length: 0 });
    })
  );

}
