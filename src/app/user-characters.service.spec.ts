import { TestBed } from '@angular/core/testing';

import { UserCharactersService } from './user-characters.service';

describe('UserCharactersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCharactersService = TestBed.get(UserCharactersService);
    expect(service).toBeTruthy();
  });
});
