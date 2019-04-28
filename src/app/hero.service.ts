import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { RaceService, Race } from './race.service';
import { CharacterService } from './character.service';

export interface Hero {
  name: string
  server: string
  race: string
  thumbnail: string,
  level: number
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  configUrl = "http://localhost:3001/characters"
  races: Race[]
  heroes: Map<string, Hero>

  constructor(readonly messageService: MessageService, readonly raceService: RaceService, readonly characterService: CharacterService) { 
    this.races = []
    this.heroes = new Map<string, Hero>()
  }

  async init() {
    this.races = await this.raceService.getRaces()
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');

    const heroes = Array.from(this.heroes.values())
    return of(heroes)
  }

  getHero(name: string, server: string): Observable<Hero | undefined> {
    this.messageService.add(`HeroService: fetched hero id=${server}-${name}`);

    return of(this.heroes.get(`${server}-${name}`))
  }

  async addHero(name: string, server: string) {
    let character = await this.characterService.getCharacter(name, server)
    let matchingRace = this.races.filter((race) => race.id == character.race)[0]
    let hero: Hero = {
      name: character.name,
      server: character.realm,
      thumbnail: "http://render-us.worldofwarcraft.com/character/" + character.thumbnail,
      race: matchingRace.name,
      level: character.level
    }
    this.heroes.set(`${server}-${name}`, hero)
  }
}
