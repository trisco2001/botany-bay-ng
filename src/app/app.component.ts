import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { TokenService } from './token.service';
import { RaceService } from './race.service';
import { HeroService } from './hero.service';
import { AmplifyService } from 'aws-amplify-angular';
import { MessageService } from './message.service';

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

  signedIn: boolean;
  user: any;
  greeting: string;

  constructor(
    readonly amplifyService: AmplifyService, 
    readonly authenticationService: AuthenticationService, 
    private tokenService: TokenService, 
    private raceService: RaceService, 
    private heroService: HeroService, 
    private messageService: MessageService) {
    this.signedIn = false
    this.greeting = ""
    this.user = null
  }

  ngOnInit() {
    this.getAuthToken()
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.messageService.add("User logged out")
          this.user = null;
        } else {
          this.messageService.add(JSON.stringify(authState.user))
          this.user = authState.user;
          this.greeting = "Hello " + this.user.username;
        }
    });
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
