import { Component, Input } from '@angular/core';
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
  index: number = 0;

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    let appointment: RegisterAppoinments = this.appointmentsServices.findAppointment(this.index);
    console.log(appointment)
    this.inputEmail = appointment.email;
    this.inputNames = appointment.names;
    this.inputLastnames = appointment.lastnames;
    this.inputObservations = appointment.observations;
    this.inputBirthDate = this.convertirFecha(appointment.birthDate);
    this.inputAppointmentDate = this.convertirFecha(appointment.appointmentDate);
    this.inputAppointmentTime = appointment.appointmentTime;
  }

  updateAppointment(){
    let appointment = new RegisterAppoinments(this.inputEmail, this.inputNames, this.inputLastnames, this.inputObservations, this.inputBirthDate, this.inputAppointmentDate, this.inputAppointmentTime);
    this.appointmentsServices.updateaAppointment(this.index, appointment);
    this.backToHome();
  }

  convertirFecha(date: Date|string|null): string {
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
