import { TestBed } from '@angular/core/testing';

import { ProductBaseService } from './product-base-service';

describe('ProductBaseService', () => {
  let service: ProductBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
