import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  changeGender(e) {
    console.log(e.target.value);
  }
  constructor() { }
  ngOnInit(): void {
  }

}
