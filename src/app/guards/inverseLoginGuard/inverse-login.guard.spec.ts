import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { inverseLoginGuard } from './inverse-login.guard';

describe('inverseLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => inverseLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
