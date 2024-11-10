import { Injectable, OnInit } from '@angular/core';
import { RegisterAppoinments } from '../interfaces/register-appointments.model';
import { FirebaseAppointmentsService } from './firebase-appointments.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppointmentsService implements OnInit {

  constructor(private firebaseAppointments: FirebaseAppointmentsService) { }
  
  // appointments: RegisterAppoinments[] = [
  //   new RegisterAppoinments('1correo@correo.com', 'Andres', 'Alfaro', 'Dolor de cabeza', '10-02-1995', '01-10-2024', '14:15'),
  //   new RegisterAppoinments('2correo@correo.com', 'Castro', 'Mejia', 'Dolor de cabeza', '10-02-1995', '02-10-2024', '14:15'),
  //   new RegisterAppoinments('3correo@correo.com', 'Ricardo', 'Lopez', 'Dolor de cabeza', '10-02-1995', '03-10-2024', '14:15'),
  //   new RegisterAppoinments('4correo@correo.com', 'Roberto', 'Torrez', 'Dolor de cabeza', '10-02-1995', '04-10-2024', '14:15'),
  //   new RegisterAppoinments('5correo@correo.com', 'Angel', 'Castillo', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
  //   new RegisterAppoinments('6correo@correo.com', 'Elias', 'Vasquez', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
  //   new RegisterAppoinments('7correo@correo.com', 'Rodrigo', 'Gomez', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
  //   new RegisterAppoinments('8correo@correo.com', 'Rodrigo', 'Gomez', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
  // ];
  appointments: RegisterAppoinments[] = [];
  newAppointment = new RegisterAppoinments('', '', '', 'Sin observaciones', null, null, '');

  ngOnInit(): void {
    // this.loadAppointments();
  }

  getAppointments(): Observable<any> {
    return this.firebaseAppointments.getAppointments();
  }

  // Cargar todas las citas
  loadAppointments(): void {
    this.firebaseAppointments.getAppointments().subscribe({
      next: (data) => {
        this.appointments = Object.keys(data || {}).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log(this.appointments);
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
      }
    });
  }

  addRegisterappointment(appointment: RegisterAppoinments){
    // this.serviceMessage.showMessage('Nombre ingresado' + employee.name);
    this.appointments.push(appointment);

    this.firebaseAppointments.createAppointment(appointment).subscribe(() => {
      // this.newAppointment = new RegisterAppoinments('', '', '', 'Sin observaciones', null, null, '');
      (response: Response) => {console.log(response)}
      (error: Response) => {console.log(error)}
      this.loadAppointments();
    });
  }

  updateaAppointment(index: number, appointment: RegisterAppoinments){
    let appointmentUpdate = this.appointments[index];
    appointmentUpdate.email = appointment.email;
    appointmentUpdate.names = appointment.names;
    appointmentUpdate.lastnames = appointment.lastnames;
    appointmentUpdate.observations = appointment.observations;
    appointmentUpdate.birthDate = appointment.birthDate;
    appointmentUpdate.appointmentDate = appointment.appointmentDate;
    appointmentUpdate.appointmentTime = appointment.appointmentTime;
  }

  findAppointment(index: number){
    let appointment: RegisterAppoinments = this.appointments[index];
    return appointment;
  }

  deleteAppointmnet(index: number){
    const resultado = window.confirm('¿Estás seguro de que quieres continuar?');

    if (resultado) {
      this.appointments.splice(index, 1);
      console.log('El usuario confirmó la acción.');
    } else {
      console.log('El usuario canceló la acción.');
    }
  }

  showMessage(message:string){
    alert(message);
  }
}
