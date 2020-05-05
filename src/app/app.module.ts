import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LecturerLoginComponent } from './lecturer-login/lecturer-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { AdminModule } from './admin/admin.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { StudentModule } from './student/student.module';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LecturerLoginComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    HomeComponent,
    ContactusComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AdminModule,
    LecturerModule,
    StudentModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthenticationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
