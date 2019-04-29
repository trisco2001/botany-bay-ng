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

  configUrl = "http://localhost:3001/classes"

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  async getClasses() {
    const token = this.tokenService.token
    const classResponse = await this.http.get<ClassResponse>(`${this.configUrl}?token=${token}`).toPromise()
    return classResponse.classes
  }
}
