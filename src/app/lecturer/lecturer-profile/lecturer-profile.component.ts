import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-lecturer-profile',
  templateUrl: './lecturer-profile.component.html',
  styleUrls: ['./lecturer-profile.component.css']
})
export class LecturerProfileComponent implements OnInit {

  service:any;
  getlecturerprofile;
  lol:any
  constructor(public hc:HttpClient ,public ds:DataService) { }

  ngOnInit() {
    this.service=this.ds.userid
    this.hc.get(`/lecturerProfile/${this.service}`).subscribe(res=>{
      this.getlecturerprofile=(res["message"][0]);
      console.log(this.getlecturerprofile)
    })
}
editlecturer(data){
  console.log(data)
  this.hc.put("/updatelecturer",data).subscribe(res=>{
    this.lol=res["message"]
    this.ngOnInit();
  })
}

}
