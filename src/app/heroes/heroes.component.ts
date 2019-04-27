import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
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