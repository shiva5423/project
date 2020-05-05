import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDashBoardComponent } from './student-dash-board/student-dash-board.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { FeeComponent } from './fee/fee.component';


const routes: Routes = [{path:"studentDashBoard",component:StudentDashBoardComponent,
children:[{path:"studentProfile",component:StudentProfileComponent},
{path:"studentFee",component:FeeComponent},
{path:"",redirectTo:"studentProfile",pathMatch:'full'}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
