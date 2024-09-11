import {ChangeDetectorRef, Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsedLanguagesService} from "../../../services/api/used-languages.service";
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData} from "chart.js";
import {HeroTitleComponent} from "../hero-title/hero-title.component";
import {LanguageData} from "../../../models/language-data";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-used-languages',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HeroTitleComponent, TranslateModule],
  templateUrl: './used-languages.component.html'
})
export class UsedLanguagesComponent implements OnInit {

  private _dataService = inject(UsedLanguagesService);
  private cdr = inject(ChangeDetectorRef); // Injecting ChangeDetectorRef

  @Input() title: string = ''; // Dynamic title for the chart
  @Input() description: string = ''; // Dynamic description for the chart
  @Input() endpoint: string = ''; // Dynamic endpoint to fetch data

  message: string = '';
  hasData: boolean = false;

  // Define the bar chart options with correct typing
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // This makes the bar chart horizontal
    scales: {
      x: {
        beginAtZero: true, // Ensure bars start from 0
      },
      y: {
        ticks: {
          font: {
            size: 14 // Increase font size for y-axis labels
          }
        }
      }
    }
  };

  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Popularity',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        barThickness: 20, // Set a fixed bar thickness
        categoryPercentage: 0.8 // Control the space between bars
      }
    ]
  };

  ngOnInit() {
    // Subscribe to the service and update the chart data and labels dynamically
    // @ts-ignore
    this._dataService.getDataByEndpoint(this.endpoint).subscribe((response) => {
      if (response && response.length > 0) {
        this.hasData = true;

        // Extracting labels (tags) and data (counts) from the response
        const labels = response.map((lang: LanguageData) => lang.tag);
        const data = response.map((lang: LanguageData) => lang.count);

        // Update the chart labels and data
        this.barChartLabels = labels;
        this.barChartData = {
          labels: this.barChartLabels,
          datasets: [
            {
              data: data,
              label: 'Popularity',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
              barThickness: 20, // Make bars thicker
              categoryPercentage: 0.8 // Adjust space between bars
            }
          ]
        };
      } else {
        this.hasData = false;
        this.message = 'No data';
      }

      // Trigger change detection after data update
      this.cdr.detectChanges();
    }, () => {
      // Handle error in the request
      this.hasData = false;
      this.message = 'No data available right now';
    });
  }
}
