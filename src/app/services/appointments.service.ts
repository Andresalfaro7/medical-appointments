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
