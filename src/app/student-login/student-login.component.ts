import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {DataService} from '../data.service'
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  constructor(public rs:Router,public ds:DataService) { }
  studentData(studentData){
  this.ds.takeData(studentData.username);
  this.ds.studentLogin(studentData).subscribe(res=>{
     if(res["message"]=="student logged sucessfully"){
       this.ds.isloggedin=true;
       localStorage.setItem("token",res["token"])
        this.rs.navigate(['/studentDashBoard'])
        }
        else{
          alert("invalid username and password");
        }
      })

  }
 
  ngOnInit(): void {
  }

}
