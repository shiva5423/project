import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {

  service:any;
  getadminprofile:any;
  lol:any
  constructor(public hc:HttpClient ,public ds:DataService) { }

  ngOnInit() {
    this.service=this.ds.userid
    this.hc.get(`/adminProfile/${this.service}`).subscribe(res=>{
      this.getadminprofile=(res["message"][0]);
      
    })
}
editadmin(data){
  this.hc.put("/updateadmin",{aid:this.getadminprofile.aid,user:data.user,phonenumber:data.phonenumber,email:data.email,address:data.address}).subscribe(res=>{
    if(res["message"]=="update done"){
      alert("profile updated successfully")
    }
    this.ngOnInit();
  })
}

}