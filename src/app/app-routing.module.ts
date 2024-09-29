import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingLandingComponent } from './bookings/booking-landing/booking-landing.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';

const routes: Routes = [
  {path:'',component:BookingLandingComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'expenses',component:ExpenseListComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
