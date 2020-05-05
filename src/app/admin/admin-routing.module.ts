import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashBoardComponent } from './admin-dash-board/admin-dash-board.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { LecturerDataComponent } from './lecturer-data/lecturer-data.component';
import { StudentDataComponent } from './student-data/student-data.component';


const routes: Routes = [{path:"adminDashBoard",component:AdminDashBoardComponent,
children:[{path:"adminProfile",component:AdminprofileComponent},
{path:"lecturerData",component:LecturerDataComponent},
{path:"studentData",component:StudentDataComponent},
{path:"",redirectTo:"adminProfile",pathMatch:'full'}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
