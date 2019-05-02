import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { HeroService, Hero } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[];

  data: any

  constructor(private heroService: HeroService, private messageService: MessageService) { 

    this.data = {
      labels: ['Scorsby', 'B', 'C'],
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
    this.getHeroes();
  }

  async getHeroes() {
    await this.heroService.init()
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    );
  }

  async add(heroName: string, server: string) {
    let heroInfo = await this.heroService.addHero(heroName, server)
    this.messageService.add(`Got info: ${heroInfo}`)
    this.getHeroes()
  }
}