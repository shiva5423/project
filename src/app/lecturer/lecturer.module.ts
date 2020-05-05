import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { LecturerRoutingModule } from './lecturer-routing.module';
import { LecturerDashBoardComponent } from './lecturer-dash-board/lecturer-dash-board.component';
import { LecturerProfileComponent } from './lecturer-profile/lecturer-profile.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AttendanceComponent } from './attendance/attendance.component';


@NgModule({
  declarations: [LecturerDashBoardComponent, LecturerProfileComponent, StudentDetailsComponent, AttendanceComponent],
  imports: [
    CommonModule,
    LecturerRoutingModule,
    FormsModule
  ]
})
export class LecturerModule { }
