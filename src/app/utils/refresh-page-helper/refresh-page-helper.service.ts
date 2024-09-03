import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshPageHelperService {

  private readonly refreshKey = 'pageRefreshed';

  refresh() {
    // Check if the page has already been refreshed
    const refreshed = sessionStorage.getItem(this.refreshKey);

    if (!refreshed) {
      // Set the flag in localStorage to indicate the page has been refreshed
      sessionStorage.setItem(this.refreshKey, 'true');

      // Refresh the page after 100 milliseconds
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  // Remove refresh key from local storage
  removeRefresh() {
    sessionStorage.removeItem(this.refreshKey)
  }

}
