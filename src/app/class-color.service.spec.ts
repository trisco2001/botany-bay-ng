import { TestBed } from '@angular/core/testing';

import { ClassColorService } from './class-color.service';

describe('ClassColorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassColorService = TestBed.get(ClassColorService);
    expect(service).toBeTruthy();
  });
});
