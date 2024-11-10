import { TestBed } from '@angular/core/testing';

import { FirebaseAppointmentsService } from './firebase-appointments.service';

describe('FirebaseAppointmentsService', () => {
  let service: FirebaseAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
