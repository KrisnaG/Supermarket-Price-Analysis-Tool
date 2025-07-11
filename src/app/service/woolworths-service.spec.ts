import { TestBed } from '@angular/core/testing';

import { WoolworthsService } from './woolworths-service';

describe('WoolworthsService', () => {
  let service: WoolworthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WoolworthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
