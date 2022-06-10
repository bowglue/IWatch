/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CardInfoService } from './card-info.service';

describe('Service: CardInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardInfoService]
    });
  });

  it('should ...', inject([CardInfoService], (service: CardInfoService) => {
    expect(service).toBeTruthy();
  }));
});
