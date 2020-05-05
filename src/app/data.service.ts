import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {
isloggedin:boolean=false;
userid:any;
  constructor(public hc:HttpClient ) { }
  takeData(username){
this.userid=username;
  }
  adminLogin(adminObj):Observable<any>
  {return this.hc.post("/adminLogin",adminObj)}
  lecturerLogin(lecObj):Observable<any>
  {return this.hc.post('/lecturerlogin',lecObj)}
  studentLogin(stdObj):Observable<any>
  {return this.hc.post('/studentlogin',stdObj)}
  //profile data
  transData()
{
  return this.userid; 
  
}
logout(){
  localStorage.clear();
   this.isloggedin=false;
 }
}
