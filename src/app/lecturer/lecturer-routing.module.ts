import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LecturerProfileComponent } from './lecturer-profile/lecturer-profile.component';
import { LecturerDashBoardComponent } from './lecturer-dash-board/lecturer-dash-board.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AttendanceComponent } from './attendance/attendance.component';


const routes: Routes = [{path:"lecturerDashBoard",component:LecturerDashBoardComponent,
children:[{path:"lecturerProfile",component:LecturerProfileComponent},
{path:"studentDetails",component:StudentDetailsComponent},
{path:"attendance",component:AttendanceComponent},
{path:"",redirectTo:"lecturerProfile",pathMatch:'full'}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturerRoutingModule { }
