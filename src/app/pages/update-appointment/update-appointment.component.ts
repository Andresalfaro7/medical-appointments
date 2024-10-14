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
  inputBirthDate: Date;
  inputAppointmentDate: Date;
  inputAppointmentTime: string = "";
  index: number = 0;

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    let appointment: RegisterAppoinments = this.appointmentsServices.findAppointment(this.index);
    this.inputEmail = appointment.email;
    this.inputNames = appointment.names;
    this.inputLastnames = appointment.lastnames;
    this.inputObservations = appointment.observations;
    this.inputAppointmentDate = appointment.appointmentDate;
    this.inputAppointmentTime = appointment.appointmentTime;
  }

  updateAppoinment(){
    let appointment = new RegisterAppoinments(this.inputEmail, this.inputNames, this.inputLastnames, this.inputObservations, this.inputBirthDate, this.inputAppointmentDate, this.inputAppointmentTime);
    this.appointmentsServices.updateaAppointment(this.index, appointment);
    this.backToHome();
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
