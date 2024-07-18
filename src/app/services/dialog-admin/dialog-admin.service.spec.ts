import { TestBed } from '@angular/core/testing';

import { DialogAdminService } from './dialog-admin.service';

describe('DialogAdminService', () => {
  let service: DialogAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
