import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserCharacter {
  name: string
  server: string
}

interface UserCharacterItem {
  id: string
  userId: string
  createdAt: number
  updatedAt: number
  characters: UserCharacter[]
}

interface UserCharactersResponse {
  Items: UserCharacterItem[]
  Count: number
  ScannedCount: number
}

interface UpdateUserCharactersBody {
  characters: UserCharacter[]
}

@Injectable({
  providedIn: 'root'
})
export class UserCharactersService {
  configUrl = "https://zxxipdok10.execute-api.us-west-2.amazonaws.com/dev/userCharacters"
  readonly options = {
    headers: {'Content-Type': 'application/json'}
  }

  constructor(private http: HttpClient) { }

  async getUserCharacters(userId: string) {
    const classResponse = await this.http.get<UserCharactersResponse>(`${this.configUrl}/${userId}`, this.options).toPromise()
    return classResponse.Items
  }

  async updateUserCharacters(userId: string, id: string, characters: UserCharacter[]) {
    let body = JSON.stringify(characters)
    const classResponse = await this.http.put<UserCharactersResponse>(`${this.configUrl}/${userId}/${id}`, body, this.options).toPromise()
    return classResponse.Items
  }

  async createUserCharacters(userId: string, characters: UserCharacter[]) {
    let object = { userId, characters }
    let body = JSON.stringify(object)
    const classResponse = await this.http.post<UserCharactersResponse>(`${this.configUrl}`, body, this.options).toPromise()
    return classResponse.Items
  }
}
