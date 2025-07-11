import { TestBed } from '@angular/core/testing';

import { ProductCoordinatorService } from './product-coordinator-service';

describe('ProductCoordinatorService', () => {
  let service: ProductCoordinatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCoordinatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
