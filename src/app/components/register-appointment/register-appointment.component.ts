import { Component } from '@angular/core';
import { RegisterAppoinments } from '../../interfaces/register-appointments.model';
import { AppointmentsService } from '../../services/appointments.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateDataService } from '../../services/validate-data.service';

@Component({
  selector: 'app-register-appointment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-appointment.component.html',
  styleUrl: './register-appointment.component.css'
})
export class RegisterAppointmentComponent {

  constructor(private router: Router, private route:ActivatedRoute, private appointmentsServices: AppointmentsService, private validateDataServices: ValidateDataService){}

  inputEmail: string = "";
  inputNames: string = "";
  inputLastnames: string = "";
  inputObservations: string = "";
  inputBirthDate: Date|null;
  inputAppointmentDate: Date|null;
  inputAppointmentTime: string = "";
  index: number = 0;
  show: string = "";

  ngOnInit(){
    console.log(this.route.snapshot.params['show']);
    this.show = this.route.snapshot.params['show'];
    if(this.show === "true"){
      this.show = "collapse show";
    } else {
      this.show = "collapse";
    }
  }

  saveAppoinment(){
    let appointment = new RegisterAppoinments(this.inputEmail, this.inputNames, this.inputLastnames, this.inputObservations, this.inputBirthDate, this.inputAppointmentDate, this.inputAppointmentTime);
    let validate = this.validateDataServices.validateForms(appointment);
    console.log(validate);
    if(!validate){
      alert('Todos los campos son requeridos');
      return;
    }
    this.appointmentsServices.addRegisterappointment(appointment);
    alert('Cita registrada a nombre de: '+this.inputNames);
    this.inputEmail= "";
    this.inputNames= "";
    this.inputLastnames= "";
    this.inputObservations= "";
    this.inputBirthDate = null;
    this.inputAppointmentDate = null;
    this.inputAppointmentTime = "";
    this.backToHome();
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
