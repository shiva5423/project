import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  service:any;
  getstudentprofile;
  lol:any
  constructor(public hc:HttpClient ,public ds:DataService) { }

  ngOnInit() {
    this.service=this.ds.userid
    this.hc.get(`/studentProfile/${this.service}`).subscribe(res=>{
      this.getstudentprofile=(res["message"][0]);
      console.log(this.getstudentprofile)
    })
}
editlecturer(data){
  console.log(data)
  this.hc.put("/updatestudent",data).subscribe(res=>{
    this.lol=res["message"]
    this.ngOnInit();
  })
}

}

