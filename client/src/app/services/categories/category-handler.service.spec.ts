import { TestBed, inject } from '@angular/core/testing';

import { CategoryHandlerService } from './category-handler.service';

describe('CategoryHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryHandlerService]
    });
  });

  it('should be created', inject([CategoryHandlerService], (service: CategoryHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
