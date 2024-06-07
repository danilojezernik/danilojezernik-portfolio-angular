import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDeviceService {

  constructor() {
  }

  getDeviceInfo() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = /iPad/i.test(navigator.userAgent);
    const isDesktop = !isMobile && !isTablet;

    let deviceName = 'Unknown';

    if (isMobile) {
      deviceName = 'Mobile';
    } else if (isTablet) {
      deviceName = 'Tablet';
    } else if (isDesktop) {
      deviceName = 'Desktop';
    }

    return {
      isMobile,
      isTablet,
      isDesktop,
      deviceName,
      userAgent: navigator.userAgent,
    };
  }
}
