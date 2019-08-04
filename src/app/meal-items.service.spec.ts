import { TestBed } from '@angular/core/testing';

import { MealItemsService } from './meal-items.service';

describe('MealItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MealItemsService = TestBed.get(MealItemsService);
    expect(service).toBeTruthy();
  });
});
