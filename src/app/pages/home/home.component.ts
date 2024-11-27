import { Component, OnInit } from '@angular/core';
import { RegisterAppoinments } from '../../interfaces/register-appointments.model';
import { AppointmentsService } from '../../services/appointments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { RegisterAppointmentComponent } from '../../components/register-appointment/register-appointment.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RegisterAppointmentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor( private appointmentsServices: AppointmentsService ){}
  show: string = "collapse";
  appointmentList: RegisterAppoinments;
  appointments: RegisterAppoinments[];

  ngOnInit(): void {
    this.appointments = this.appointmentsServices.appointments;
    console.log(this.appointmentsServices.appointments);
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentsServices.getAppointments().subscribe({
      next: (data) => {
        if(data !== null || data !== undefined){
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
        }
        console.log(this.appointments);
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
      }
    });
  }

  deleteAppointment(id: string): void {
    this.appointmentsServices.deleteAppointmnet(id).subscribe({
      next: () => {
        console.log('Cita eliminada exitosamente');
        this.loadAppointments();
      },
      error: (error) => {
        console.error('Error al eliminar cita:', error);
      }
    });
  }

  calculateAge(birthDate: Date|string): number {
    // console.log(birthDate);
    const today = new Date();
    const birthDatePerson = new Date(birthDate);
    let age = today.getFullYear() - birthDatePerson.getFullYear();
    const month = today.getMonth() - birthDatePerson.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDatePerson.getDate())) {
      age--;
    }
    return age;
  }

  formatDate(date: Date | string): string {
    // console.log(date);
    let dateAppointment = new Date(date);
    const day = dateAppointment.getDate().toString().padStart(2, '0');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = meses[dateAppointment.getMonth()];
    const year = dateAppointment.getFullYear();
    return `${day} de ${month} del ${year}`;
  }
  
}
