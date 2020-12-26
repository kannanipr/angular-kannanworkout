import { TestBed } from '@angular/core/testing';

import { GenericRestApiService } from './generic-rest-api.service';

describe('GenericRestApiService', () => {
  let service: GenericRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
