import { Injectable, OnInit } from '@angular/core';
import { RegisterAppoinments } from '../interfaces/register-appointments.model';
import { FirebaseAppointmentsService } from './firebase-appointments.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppointmentsService {

  constructor(private firebaseAppointments: FirebaseAppointmentsService) { }

  appointments: RegisterAppoinments[] = [];
  newAppointment = new RegisterAppoinments('', '', '', '', 'Sin observaciones', null, null, '');

  getAppointments(): Observable<any> {
    return this.firebaseAppointments.getAppointments();
  }

  // Load all appointmnets
  loadAppointments(): void {
    this.firebaseAppointments.getAppointments().subscribe({
      next: (data) => {
        this.appointments = Object.keys(data || {}).map((key) => {
          const appointmentData = { ...data[key] };
          return new RegisterAppoinments(
            key,
            appointmentData.email,
            appointmentData.names,
            appointmentData.lastnames,
            appointmentData.observations || 'Sin observaciones',
            appointmentData.birthDate,
            appointmentData.appointmentDate,
            appointmentData.appointmentTime
          );
        });
        console.log(this.appointments);
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
      }
    });
  }

  // Add new appointment
  addRegisterappointment(appointment: RegisterAppoinments): Observable<any> {
    return this.firebaseAppointments.createAppointment(appointment);
  }

  // Update appointment by id
  updateaAppointment(index: number, appointment: RegisterAppoinments) {
    let appointmentUpdate = this.appointments[index];
    appointmentUpdate.email = appointment.email;
    appointmentUpdate.names = appointment.names;
    appointmentUpdate.lastnames = appointment.lastnames;
    appointmentUpdate.observations = appointment.observations;
    appointmentUpdate.birthDate = appointment.birthDate;
    appointmentUpdate.appointmentDate = appointment.appointmentDate;
    appointmentUpdate.appointmentTime = appointment.appointmentTime;
  }

  // Update appointment
  updateAppointment(id: string, appointment: RegisterAppoinments): Observable<any> {
    return this.firebaseAppointments.updateAppointment(id, appointment);
  }

  // Get appointment by id
  getAppointmentById(id: string): Observable<any> {
    return this.firebaseAppointments.getAppointmentById(id);
  }

  // Delete appointment by id
  deleteAppointmnet(id: string): Observable<any> {
    const resultado = window.confirm('¿Estás seguro de que quieres continuar?');
    if (resultado) {
      console.log('El usuario confirmó la acción.');
      return this.firebaseAppointments.deleteAppointment(id);
    } else {
      console.log('El usuario canceló la acción.');
      return of(null);
    }
  }

  // Show message by alert
  showMessage(message: string) {
    alert(message);
  }
}
