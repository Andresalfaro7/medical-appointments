import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RegisterAppoinments} from '../interfaces/register-appointments.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAppointmentsService {
  private dbUrl = 'https://andres-alfaro-ing-default-rtdb.firebaseio.com/navidad';

  constructor(private http: HttpClient) { }

  // Crear una nueva cita
  createAppointment(appointment: RegisterAppoinments): Observable<any> {
    return this.http.post(`${this.dbUrl}.json`, appointment);
  }

  // Leer todas las citas
  getAppointments(): Observable<{ [key: string]: RegisterAppoinments }> {
    return this.http.get<{ [key: string]: RegisterAppoinments }>(`${this.dbUrl}.json`);
  }

  // Actualizar una cita por ID
  updateAppointment(id: string, appointment: RegisterAppoinments): Observable<any> {
    return this.http.put(`${this.dbUrl}/${id}.json`, appointment);
  }

  // Eliminar una cita por ID
  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.dbUrl}/${id}.json`);
  }
}
