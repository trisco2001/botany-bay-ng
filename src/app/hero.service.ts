import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { RaceService, Race } from './race.service';
import { CharacterService } from './character.service';
import { ClassService, Class } from './class.service';
import { ClassColorService } from './class-color.service';
import { UserCharactersService, UserCharacter } from './user-characters.service';
import { AmplifyService } from 'aws-amplify-angular';

export interface Hero {
  name: string
  server: string
  race: string
  class: string
  thumbnail: string
  level: number
  color: string
  itemLevel: number
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  races: Race[]
  classes: Class[]
  heroes: Map<string, Hero>
  userCharacters: UserCharacter[]

  constructor(readonly messageService: MessageService, 
    readonly raceService: RaceService, 
    readonly characterService: CharacterService, 
    readonly classService: ClassService, 
    readonly classColorService: ClassColorService,
    readonly userCharactersService: UserCharactersService,
    readonly amplifyService: AmplifyService) { 
    this.races = []
    this.classes = []
    this.heroes = new Map<string, Hero>()
    this.userCharacters = []
  }

  async init() {
    this.races = await this.raceService.getRaces()
    this.classes = await this.classService.getClasses()
    const userId = this.amplifyService.auth().username
    const userCharacterItems = await this.userCharactersService.getUserCharacters(userId)
    if (userCharacterItems.length == 0) {
      this.userCharacters = []
    } else {
      this.userCharacters = userCharacterItems[0].characters
    }

    for (const userCharacter of this.userCharacters){
      console.log(userCharacter)
      let character = await this.characterService.getCharacter(userCharacter.name, userCharacter.server)
      let matchingRace = this.races.filter((r) => r.id == character.race)[0]
      let matchingClass = this.classes.filter((c) => c.id == character.class)[0]
      let color = this.classColorService.getColorForClass(matchingClass.id)
      let hero: Hero = {
        name: character.name,
        server: character.realm,
        thumbnail: "http://render-us.worldofwarcraft.com/character/" + character.thumbnail,
        race: matchingRace.name,
        level: character.level,
        class: matchingClass.name,
        color: color,
        itemLevel: character.items.averageItemLevelEquipped
      }
      this.heroes.set(`${userCharacter.server}-${userCharacter.name}`, hero)
    }
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');

    const heroes = Array.from(this.heroes.values())
    return of(heroes.sort((a, b) => b.itemLevel - a.itemLevel))
  }

  getHero(name: string, server: string): Observable<Hero | undefined> {
    return of(this.heroes.get(`${server}-${name}`))
  }

  async addHero(name: string, server: string) {
    let character = await this.characterService.getCharacter(name, server)
    let matchingRace = this.races.filter((r) => r.id == character.race)[0]
    let matchingClass = this.classes.filter((c) => c.id == character.class)[0]
    let color = this.classColorService.getColorForClass(matchingClass.id)
    let hero: Hero = {
      name: character.name,
      server: character.realm,
      thumbnail: "http://render-us.worldofwarcraft.com/character/" + character.thumbnail,
      race: matchingRace.name,
      level: character.level,
      class: matchingClass.name,
      color: color,
      itemLevel: character.items.averageItemLevelEquipped
    }

    this.messageService.add(`HeroService: added hero id=${server}-${name}`);
    this.messageService.add(JSON.stringify(hero))
    this.heroes.set(`${server}-${name}`, hero)

    const heroes = Array.from(this.heroes.values())
    const userId = this.amplifyService.auth().username
    const userCharacters = await this.userCharactersService.getUserCharacters(userId)
    if (userCharacters.length == 0) {
      this.userCharactersService.createUserCharacters(userId, heroes)
    } else {
      let id = userCharacters[0].id
      this.userCharactersService.updateUserCharacters(userId, id, heroes)
    }
  }
}
