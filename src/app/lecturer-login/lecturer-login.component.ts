import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {DataService} from '../data.service'
@Component({
  selector: 'app-lecturer-login',
  templateUrl: './lecturer-login.component.html',
  styleUrls: ['./lecturer-login.component.css']
})
export class LecturerLoginComponent implements OnInit {

  constructor(public rs:Router,public ds:DataService) { }
  lecturerData(lecturerData){
  this.ds.takeData(lecturerData.username);
  this.ds.lecturerLogin(lecturerData).subscribe(res=>{
    //alert( res["message"])
     if(res["message"]=="lecturer logged successfully"){
       this.ds.isloggedin=true;
       localStorage.setItem("token",res["token"])
       alert(`welcome ${lecturerData.username}`)
        this.rs.navigate(['/lecturerDashBoard'])
        }
        else{
          alert("invalid username and password");
        }
      })

  }
  ngOnInit(): void {
  }

}
