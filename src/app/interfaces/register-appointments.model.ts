export class RegisterAppoinments {
    email:string = "";
    names:string = "";
    lastnames:string = "";
    observations: string = "";
    birthDate: Date | null | string;
    appointmentDate: Date | null | string;
    appointmentTime: string = "";

    constructor(email:string, names:string,  lastnames:string, observations:string = "Sin observaciones", birthDate:Date|null|string, appointmentDate:Date|null|string, appointmentTime:string){
        this.email = email;
        this.names = names;
        this.lastnames = lastnames;
        this.observations = observations;
        this.birthDate = birthDate;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
    }
}