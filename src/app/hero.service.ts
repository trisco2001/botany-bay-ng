import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { TokenService } from './token.service';

interface HeroIdentity {
  heroName: string
  server: string
}

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  configUrl = "http://localhost:3001/characters"
  heroIdentities: HeroIdentity[]
  heroes: {[key: string]: Hero} = {}
  constructor(readonly http: HttpClient, readonly messageService: MessageService, readonly tokenService: TokenService) { 
    this.heroIdentities = []
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    const heroKeys = this.heroIdentities.map ((identity) => {
      return `${identity.server}-${identity.heroName}`
    })
    const heroes = heroKeys.map ((key)=>this.heroes[key])
    return of(heroes)
  }

  getHero(id: number): Observable<Hero | undefined> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);

    const heroKeys = this.heroIdentities.map ((identity) => {
      return `${identity.server}-${identity.heroName}`
    })
    const heroes = heroKeys.map ((key)=>this.heroes[key])
    return of(heroes.filter((hero) => hero.achievementPoints == id)[0])
  }

  async addHero(heroName: string, server: string) {
    const token = this.tokenService.token
    let hero = await this.http.get<Hero>(this.configUrl + `/${server}/${heroName}?token=${token}`).toPromise()
    hero.thumbnail = "http://render-us.worldofwarcraft.com/character/" + hero.thumbnail
    this.heroIdentities.push({heroName: heroName, server: server})
    this.heroes[`${server}-${heroName}`] = hero
    return hero
  }
}
