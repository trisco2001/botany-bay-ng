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

  configUrl = "http://localhost:3001/races"

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  async getRaces() {
    const token = this.tokenService.token
    const raceResponse = await this.http.get<RaceResponse>(`${this.configUrl}?token=${token}`).toPromise()
    return raceResponse.races
  }
  
}
