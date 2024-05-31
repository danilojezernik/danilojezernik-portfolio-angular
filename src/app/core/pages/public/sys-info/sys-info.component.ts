import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysInfoService } from "../../../../services/api/sysinfo/sys-info.service";
import { map, Observable } from "rxjs";
import { SysInfo } from "../../../../models/sys-info.model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sys-info',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './sys-info.component.html'
})
export class SysInfoComponent implements OnInit {

  private _sysInfoService = inject(SysInfoService)
  private _assets = inject(HttpClient)

  // Define observables to hold system information data and formatted system information data
  sysInfo$: Observable<SysInfo> | undefined;
  formattedSysInfo$: Observable<{ [key: string]: string } | undefined> | undefined;
  data: any;

  ngOnInit(): void {
    // Retrieve system information data from the service
    this.sysInfo$ = this._sysInfoService.getSysData();

    // Format the system information data using the formatSysInfo method and assign the result to formattedSysInfo$
    this.formattedSysInfo$ = this.sysInfo$?.pipe(
      map(sysInfo => this.formatSysInfo(sysInfo))
    );

    const path = 'assets/sys-info-windows.json'
    this._assets.get(path).subscribe((response) => {
      console.log(response)
      this.data = response
    })

  }

  // Method to format the system information data into a key-value object
  private formatSysInfo(sysInfo: SysInfo): { [key: string]: string } | undefined {
    // If sysInfo is not available, return undefined
    if (!sysInfo) return undefined;

    // Initialize an empty object to hold formatted system information
    const formattedSysInfo: { [key: string]: string } = {};

    // Iterate over each key in sysInfo and copy the value to formattedSysInfo
    Object.keys(sysInfo).forEach(key => {
      formattedSysInfo[key] = sysInfo[key] as string;
    });

    // Return the formatted system information object
    return formattedSysInfo;
  }

}
