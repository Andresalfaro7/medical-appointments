import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterAppoinments } from '../../interfaces/register-appointments.model';
import { AppointmentsService } from '../../services/appointments.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css'
})
export class UpdateAppointmentComponent {
  constructor( private router: Router, private route:ActivatedRoute, private appointmentsServices: AppointmentsService ){}

  inputEmail: string = "";
  inputNames: string = "";
  inputLastnames: string = "";
  inputObservations: string = "";
  inputBirthDate: Date|null|string;
  inputAppointmentDate: Date|null|string;
  inputAppointmentTime: string = "";
  index: string = '';

  selectedAppointment: RegisterAppoinments | null = null;
  
  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    this.getAppointmentById(this.index);
  }

  // Update appointment by id
  updateAppointment() :void{
    let appointment = new RegisterAppoinments(this.index, this.inputEmail, this.inputNames, this.inputLastnames, this.inputObservations, this.inputBirthDate, this.inputAppointmentDate, this.inputAppointmentTime);
    this.appointmentsServices.updateAppointment(this.index, appointment).subscribe({
      next: () => {
        console.log('Cita actualizada exitosamente');
        this.appointmentsServices.loadAppointments();
        this.backToHome();
      },
      error: (error) => {
        console.error('Error al actualizar cita:', error);
      }
    });
  }

  // Get appointment by id
  getAppointmentById(id: string): void {
    this.appointmentsServices.getAppointmentById(id).subscribe({
      next: (data) => {
        this.selectedAppointment = { id, ...data };
        if(this.selectedAppointment){
          console.log('Cita obtenida:', this.selectedAppointment);
          this.inputEmail = this.selectedAppointment.email;
          this.inputNames = this.selectedAppointment.names;
          this.inputLastnames = this.selectedAppointment.lastnames;
          this.inputObservations = this.selectedAppointment.observations;
          this.inputBirthDate = this.convertDate(this.selectedAppointment.birthDate);
          this.inputAppointmentDate = this.convertDate(this.selectedAppointment.appointmentDate);
          this.inputAppointmentTime = this.selectedAppointment.appointmentTime;
        }
      },
      error: (error) => {
        console.error('Error al obtener la cita:', error);
      }
    });
  }

  convertDate(date: Date|string|null): string {
    if(date instanceof Date){
      const año = date.getFullYear();
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const dia = date.getDate().toString().padStart(2, '0');
      return `${año}-${mes}-${dia}`;
    }
    if(typeof date == "string"){
      let dt = new Date(date);
      const año = dt.getFullYear();
      const mes = (dt.getMonth() + 1).toString().padStart(2, '0');
      const dia = dt.getDate().toString().padStart(2, '0');
      return `${año}-${mes}-${dia}`;
    }
    return 'No fecha';
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
