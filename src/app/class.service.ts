import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

export interface Class {
  id: number,
  mask: number,
  powertype: string,
  name: string
}

interface ClassResponse {
  classes: Class[]
}

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  configUrl = "https://i390mm2xsg.execute-api.us-west-2.amazonaws.com/dev/classes"

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  async getClasses() {
    const token = this.tokenService.token
    const classResponse = await this.http.get<ClassResponse>(`${this.configUrl}?token=${token}`).toPromise()
    return classResponse.classes
  }
}
