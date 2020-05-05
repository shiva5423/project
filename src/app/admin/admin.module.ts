import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AdminRoutingModule } from './admin-routing.module';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { LecturerDataComponent } from './lecturer-data/lecturer-data.component';
import { StudentDataComponent } from './student-data/student-data.component';


@NgModule({
  declarations: [AdminprofileComponent, AdminDashBoardComponent, LecturerDataComponent, StudentDataComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,

  ]
})
export class AdminModule { }
