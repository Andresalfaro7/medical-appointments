import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UpdateAppointmentComponent } from './pages/update-appointment/update-appointment.component';
import { RegisterAppointmentComponent } from './components/register-appointment/register-appointment.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginGuardian } from './pages/login/login-guardian';

export const routes: Routes = [
    {path:'', component:HomeComponent, canActivate: [LoginGuardian]},
    {path:'actualiza/:id', component:UpdateAppointmentComponent, canActivate: [LoginGuardian]},
    {path:'registrar-cita/:show', component:RegisterAppointmentComponent, canActivate: [LoginGuardian]},
    {path: 'login', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent},
];
