import { TestBed } from '@angular/core/testing';

import { UserInfosServiceService } from './user-infos-service.service';

describe('UserInfosServiceService', () => {
  let service: UserInfosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
