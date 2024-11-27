import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegisterAppoinments} from '../interfaces/register-appointments.model';
import { LoginService } from '../pages/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAppointmentsService {
  private dbUrl = 'https://andres-alfaro-ing-default-rtdb.firebaseio.com/navidad';

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // Create a new appointment
  createAppointment(appointment: RegisterAppoinments): Observable<any> {
    return this.http.post(`${this.dbUrl}.json`, appointment);
  }

  // Get alls appointments
  getAppointments(): Observable<{ [key: string]: RegisterAppoinments }> {
    const token = this.loginService.getIdToken();
    return this.http.get<{ [key: string]: RegisterAppoinments }>(`${this.dbUrl}.json?auth=${token}`);
  }

  // Update appoinment by id
  updateAppointment(id: string, appointment: RegisterAppoinments): Observable<any> {
    return this.http.put(`${this.dbUrl}/${id}.json`, appointment);
  }

  // Delete appointment by id
  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.dbUrl}/${id}.json`);
  }

  // get appoinment by id
  getAppointmentById(id: string): Observable<any> {
    return this.http.get(`${this.dbUrl}/${id}.json`);
  }
}
