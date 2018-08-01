import { TestBed, inject } from '@angular/core/testing';

import { AdminHandlerService } from './admin-handler.service';

describe('AdminHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminHandlerService]
    });
  });

  it('should be created', inject([AdminHandlerService], (service: AdminHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
