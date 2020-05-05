import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {DataService} from '../data.service'
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(public rs:Router,public ds:DataService) { }
  admindata(adminData){
  this.ds.takeData(adminData.username);
  this.ds.adminLogin(adminData).subscribe(res=>{
     if(res["message"]=="admin logged successfully"){
       this.ds.isloggedin=true;
       localStorage.setItem("token",res["token"])
       alert(`welcome ${adminData.username}` )
        this.rs.navigate(['/adminDashBoard'])
        }
        else{
          alert("invalid username and password");
        }
      })

  }

  ngOnInit(): void {
  }

}
