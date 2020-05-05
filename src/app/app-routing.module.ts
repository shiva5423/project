import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LecturerLoginComponent } from './lecturer-login/lecturer-login.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [{path:"home",component:HomeComponent},
{path:"contactus",component:ContactusComponent},
{path:"aboutus",component:AboutusComponent},
  {path:"login",component:LoginComponent,
children:[{path:"studentLogin",component:StudentLoginComponent},
{path:"adminLogin",component:AdminLoginComponent},
{path:"lecturerLogin",component:LecturerLoginComponent},
{path:"",redirectTo:'studentLogin',pathMatch:'full'}]},
{path:"",redirectTo:'home',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
