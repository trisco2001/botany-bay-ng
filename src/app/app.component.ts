import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { TokenService } from './token.service';
import { RaceService } from './race.service';
import { HeroService } from './hero.service';

interface AuthToken {
  authToken: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Botany Bay';
  token = 'LOADING, BUTTERCUPS'

  constructor(readonly authenticationService: AuthenticationService, private tokenService: TokenService, private raceService: RaceService, private heroService: HeroService) {}

  ngOnInit() {
    this.getAuthToken()
  }

  getAuthToken() {
    this.authenticationService.getToken().subscribe((data) => {
      this.token = data.authToken
      this.tokenService.token = data.authToken
      this.raceService.getRaces().then( (races) => {
        this.heroService.init()
      })
    });
  }
}
