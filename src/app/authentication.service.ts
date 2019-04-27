import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface AuthToken {
  authToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  configUrl = "http://localhost:3000/auth"
  constructor(readonly http: HttpClient) { }

  getToken() {
    return this.http.get<AuthToken>(this.configUrl)
  }
}
