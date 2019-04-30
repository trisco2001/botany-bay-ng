import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface AuthToken {
  authToken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  configUrl = "https://p1hflp6h09.execute-api.us-west-2.amazonaws.com/dev/auth"
  constructor(readonly http: HttpClient) { }

  getToken() {
    return this.http.get<AuthToken>(this.configUrl)
  }
}
