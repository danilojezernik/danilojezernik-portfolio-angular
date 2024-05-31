import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SysInfo } from "../../../models/sys-info.model";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class SysInfoService {

  _http = inject(HttpClient)

  getSysData(): Observable<SysInfo> {
    return this._http.get<SysInfo>(`${environment.localUrl}interesting/sysinfo`)
  }

}
