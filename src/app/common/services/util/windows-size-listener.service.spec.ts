import { TestBed } from '@angular/core/testing';

import { WindowsSizeListenerService } from './windows-size-listener.service';

describe('WindowsSizeListenerService', () => {
  let service: WindowsSizeListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowsSizeListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
