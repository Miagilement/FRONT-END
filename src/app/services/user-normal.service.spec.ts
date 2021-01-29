import { TestBed } from '@angular/core/testing';

import { UserNormalService } from './user-normal.service';

describe('UserNormalService', () => {
  let service: UserNormalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNormalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
