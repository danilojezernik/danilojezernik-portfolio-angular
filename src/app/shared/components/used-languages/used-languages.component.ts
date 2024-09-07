import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsedLanguagesService} from "../../../services/api/used-languages.service";
import {map} from "rxjs";
import {NgChartsModule} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import {HeroTitleComponent} from "../hero-title/hero-title.component";

@Component({
  selector: 'app-used-languages',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HeroTitleComponent],
  templateUrl: './used-languages.component.html'
})
export class UsedLanguagesComponent implements OnInit {

  private _usedLanguagesService = inject(UsedLanguagesService)
  private cdr = inject(ChangeDetectorRef); // Injecting ChangeDetectorRef

  // Define the bar chart options with correct typing
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow full width/height
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
        label: 'Programming Languages Popularity',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          // Add more colors if needed for more data points
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
        barThickness: 20, // Set a fixed bar thickness (e.g., 40px)
        categoryPercentage: 0.8, // Control the space between bars
      }
    ]
  };

  public barChartType: ChartType = 'bar';

  ngOnInit() {
    console.log('Component initialized');

    // Subscribe to the service and update the chart data and labels dynamically
    this._usedLanguagesService.getLanguages().subscribe((response) => {
      const languageTags = response.tags;

      // Log the fetched data for debugging
      console.log('Fetched data:', languageTags);

      // Extracting labels (tags) and data (counts) from the response
      const labels = languageTags.map((lang: any) => lang.tag);
      const data = languageTags.map((lang: any) => lang.count);

      // Update the chart labels and data
      this.barChartLabels = labels;
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: data,
            label: 'Programming Languages Popularity',
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

      // Trigger change detection after data update
      this.cdr.detectChanges();

      // Log to confirm the chart data is updated
      console.log('Updated barChartData:', this.barChartData);
    });
  }
}
