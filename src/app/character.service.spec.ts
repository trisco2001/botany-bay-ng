import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';

describe('ApiHeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });
});
