import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdateAppointmentComponent } from './pages/update-appointment/update-appointment.component';
import { RegisterAppointmentComponent } from './components/register-appointment/register-appointment.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'actualiza/:id', component:UpdateAppointmentComponent},
    {path:'registrar-cita/:show', component:RegisterAppointmentComponent}
];
