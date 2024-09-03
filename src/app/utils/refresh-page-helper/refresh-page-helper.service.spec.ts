import { TestBed } from '@angular/core/testing';

import { RefreshPageHelperService } from './refresh-page-helper.service';

describe('RefreshPageHelperService', () => {
  let service: RefreshPageHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshPageHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
