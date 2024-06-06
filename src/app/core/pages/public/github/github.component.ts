import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from "../../../../services/api/github.service";
import { map, Observable } from "rxjs";
import { Repo } from "../../../../models/github.model";

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './github.component.html'
})
export class GithubComponent {

  _githubService = inject(GithubService)

  github$: Observable<Repo[]> = this._githubService.getGitHubRepo().pipe(
    map(repos => repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner: repo.owner,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language
    })))
  )

}
