import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  configUrl = "http://localhost:3001/characters"

  constructor(private http: HttpClient, readonly tokenService: TokenService) { }

  async getCharacter(name: string, server: string) {
    const token = this.tokenService.token
    let hero = await this.http.get<Character>(this.configUrl + `/${server}/${name}?token=${token}`).toPromise()
    return hero
  }
}
