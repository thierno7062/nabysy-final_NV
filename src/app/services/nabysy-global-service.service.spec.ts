import { TestBed } from '@angular/core/testing';

import { NabysyGlobalServiceService } from './nabysy-global-service.service';

describe('NabysyGlobalServiceService', () => {
  let service: NabysyGlobalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NabysyGlobalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
