import { Injectable } from '@angular/core';
import { RegisterAppoinments } from '../interfaces/register-appointments.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor() { }

  appointments: RegisterAppoinments[] = [
    new RegisterAppoinments('1correo@correo.com', 'Andres', 'Alfaro', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
    new RegisterAppoinments('2correo@correo.com', 'Castro', 'Design', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
    new RegisterAppoinments('3correo@correo.com', 'Lopez', 'Analist', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
    new RegisterAppoinments('4correo@correo.com', 'Hernandez', 'Datamaster', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
    new RegisterAppoinments('4correo@correo.com', 'Hernandez', 'Datamaster', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
    new RegisterAppoinments('4correo@correo.com', 'Hernandez', 'Datamaster', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
    new RegisterAppoinments('4correo@correo.com', 'Hernandez', 'Datamaster', 'Dolor de cabeza', '10-02-1995', '12-10-2024', '14:15'),
  ];

  addRegisterappointment(appointment: RegisterAppoinments){
    // this.serviceMessage.showMessage('Nombre ingresado' + employee.name);
    this.appointments.push(appointment);
  }

  updateaAppointment(index: number, appointment: RegisterAppoinments){
    let appointmentUpdate = this.appointments[index];
    appointmentUpdate.email = appointment.email;
    appointmentUpdate.names = appointment.names;
    appointmentUpdate.lastnames = appointment.lastnames;
  }

  findAppointment(index: number){
    let appointment: RegisterAppoinments = this.appointments[index];
    return appointment;
  }

  deleteAppointmnet(index: number){
    this.appointments.splice(index, 1);
  }

  showMessage(message:string){
    alert(message);
  }
}
