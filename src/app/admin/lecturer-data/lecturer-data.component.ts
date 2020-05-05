import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-lecturer-data',
  templateUrl: './lecturer-data.component.html',
  styleUrls: ['./lecturer-data.component.css']
})
export class LecturerDataComponent implements OnInit {
respond;
ldata;
ldelete;
replay;
editReplay;
edata;
b:boolean=false;
  constructor(public hc:HttpClient,public ds:DataService) { }
lecturerdata(data){
  this.hc.post("/postEmpObj",data).subscribe(res=>{
    this.respond=res["message"]
    this.ngOnInit();
  })
}
  ngOnInit() {
    this.hc.get("/readEmpData").subscribe(res=>{
      this.ldata=res["message"];
      
    })
  }
  changestatus(){
    this.b=!this.b
  }
edit(s){
this.edata=s;
}
editdata(d){
  this.hc.put('/updateEmpData',{lid:this.edata.lid,user:d.user,subject:d.subject,phonenumber:d.phonenumber}).subscribe(res=>{
  this.editReplay=res['message'];
  this.ngOnInit();
  })
}
delete(s){this.ldelete=s.lid}
deleterecord(){
  this.hc.delete(`/removelecturer/${this.ldelete}`).subscribe(res=>{
    this.replay=res["message"]
    this.ngOnInit();
  })
}
}
