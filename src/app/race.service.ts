import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';

export interface Race {
  id: number,
  mask: number,
  side: string,
  name: string
}

interface RaceResponse {
  races: Race[]
}

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  configUrl = "https://i390mm2xsg.execute-api.us-west-2.amazonaws.com/dev/races"

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  async getRaces() {
    const token = this.tokenService.token
    const raceResponse = await this.http.get<RaceResponse>(`${this.configUrl}?token=${token}`).toPromise()
    return raceResponse.races
  }
  
}
