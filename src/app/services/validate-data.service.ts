import { Injectable } from '@angular/core';
import { RegisterAppoinments } from '../interfaces/register-appointments.model';

@Injectable({
  providedIn: 'root'
})
export class ValidateDataService {

  constructor() { }

  validateForms(data: RegisterAppoinments): boolean{
    console.log(data);
    if(data.email === "" || data.lastnames === "" || data.names === "" || data.names === ""){
      return false;
    }
    return true;
  }
}
