import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
 
  respond;
  sdata;
  sdelete;
  replay;
  editReplay;
  edata;
  attres:any;
  b:boolean=false;
    constructor(public hc:HttpClient,public ds:DataService) { }
  studentdata(data){
    this.hc.post("/postStdObj",data).subscribe(res=>{
      this.respond=res["message"]
      this.ngOnInit();
    })
  }
  changestatus(){
    this.b=!this.b
  }
    ngOnInit() {
      this.hc.get("/readStdData").subscribe(res=>{
        this.sdata=res["message"];
        
      })
    }
  edit(s){
  this.edata=s;
  }
  editdata(d){
    this.hc.put("/updateStdData",{sid:this.edata.sid,user:d.user,email:d.email,phonenumber:d.phonenumber}).subscribe(res=>{
    this.editReplay=res['message'];
    this.ngOnInit();
    })
  }
  delete(s){this.sdelete=s.sid}
  deleterecord(){
    this.hc.delete(`/removeStudent/${this.sdelete}`).subscribe(res=>{
      this.replay=res["message"]
      this.ngOnInit();
    })
  }
  att(s){
    this.hc.get(`/attendance/${s.sid}`).subscribe(res=>{
      this.attres=(res["message"][0]);
    })
  }
  }
  
