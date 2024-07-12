import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from "../../../../services/api/github.service";
import { catchError, map, Observable, of } from "rxjs";
import { Repo } from "../../../../models/github.model";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [ CommonModule, TranslateModule ],
  templateUrl: './github.component.html'
})
export class GithubComponent {

  _githubService = inject(GithubService)
  _translateService = inject(TranslateService)
  error: string | null = null;

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

      const message = error.message

      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      return of({ repos: [], length: 0 })
    })
  )

}
