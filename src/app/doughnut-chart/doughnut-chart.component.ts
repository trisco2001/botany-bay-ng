import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Hero } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'chart-doughnut',
  template: `
  <p-chart type="horizontalBar" [data]="data" [options]="options" [responsive]="true"></p-chart>
  `
})
export class DoughnutChartComponent implements OnInit, OnChanges {

  data: any
  options: any
  listHeight: number

  @Input() heroes?: Hero[]

  constructor(private messageService: MessageService) {
    this.listHeight = 0
    this.data = {
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.heroes === null || this.heroes === undefined) {
      return
    }
    else if (changes.heroes) {
      this.messageService.add(JSON.stringify(this.heroes))
      const labels = this.heroes.map((hero) => {return hero.name})
      const data = this.heroes.map((hero)=> hero.itemLevel)
      const colors = this.heroes.map((hero)=> hero.color)
      this.data = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
          }
        ]
      };
      this.options = {
        legend: {
          display: false
        }
      }
    }

    this.listHeight = 40 * this.heroes.length
  }

  ngOnInit() {
  }

}