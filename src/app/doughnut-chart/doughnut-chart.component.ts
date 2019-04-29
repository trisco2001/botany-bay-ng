import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Hero } from '../hero.service';
import { MessageService } from '../message.service';
import { hasParentInjector } from '@angular/core/src/render3/util';

@Component({
  selector: 'chart-doughnut',
  template: `
    <div style="height: 250px; width: 400px; background-color: #AAA">
    <p-chart type="doughnut" [data]="data" [responsive]="true" 
        height="250" width="400"></p-chart>
    </div>
  `
})
export class DoughnutChartComponent implements OnInit, OnChanges {

  data: any

  @Input() heroes?: Hero[]

  constructor(private messageService: MessageService) {
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

  ngOnChanges(changes: SimpleChanges) {
    if (this.heroes === null || this.heroes === undefined) {
      return
    }
    else if (changes.heroes) {
      this.messageService.add(JSON.stringify(this.heroes))
      const labels = this.heroes.map((hero) => {return hero.name})
      const data = this.heroes.map((hero)=> hero.level)
      const colors = this.heroes.map((hero)=> hero.color)
      this.data = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
          }]
      };
    }
  }

  ngOnInit() {
  }

}