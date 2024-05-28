import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GithubService} from "../../../../services/api/github/github.service";
import {map} from "rxjs";

@Component({
  selector: 'app-github',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent {

  _githubService = inject(GithubService)

  github$ = this._githubService.getGitHubRepo().pipe(
    map(data => data.repos)
  )

}
