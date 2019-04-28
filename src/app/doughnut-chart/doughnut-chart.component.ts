import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-doughnut',
  template: `
    <div style="height: 250px; width: 400px; background-color: #AAA">
    <p-chart type="doughnut" [data]="data" [responsive]="true" 
        height="250" width="400"></p-chart>
    </div>
  `
})
export class DoughnutChartComponent implements OnInit {

  data: any;

  constructor() {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }

  ngOnInit() {
  }

}