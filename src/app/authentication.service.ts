import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
  import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    const token=localStorage.getItem("token");
    //if token found attach with request object and forward
    if(token){
      //attach token to headers of req object using bearer acheme
      const cloned=req.clone({headers:req.headers.set("Authorization","Bearer "+token)});
      return next.handle(cloned);
    }
    // if toen is not found ,forward the same in as it is
    else{
      return next.handle(req);
    } 
  }
  constructor() { }
}
