import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { StudentRoutingModule } from './student-routing.module';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentDashBoardComponent } from './student-dash-board/student-dash-board.component';
import { FeeComponent } from './fee/fee.component';


@NgModule({
  declarations: [StudentProfileComponent, StudentDashBoardComponent, FeeComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule
  ]
})
export class StudentModule { }
