import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model"
import { flatMap, Subject } from "rxjs";
import { HttpClient} from '@angular/common/http'
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { environment } from './../../environments/environment';


const BACKEND_URL = environment.apiUrl + "/user"

@Injectable({providedIn:'root'})
export class AuthService{
  private token:any;
  private authStatusListener= new Subject<boolean>
  private isAuthencated = false
  private tokenTimer:any


  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService){

  }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthencated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable()
  }

  createUser(userData:any){
    return this.http.post(BACKEND_URL + '/signup',userData).subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      this.authStatusListener.next(false);
    })
  }

  login(userData:any){
    this.http.post<{token:string}>(BACKEND_URL +'/login',userData)
    .subscribe(response => {
        let result:any=response
        this.token = result.userData.userToken;
        if(this.token){
          // this.toastr.success("Loggeg In Successfully");
          const expiresInDuration = result.userData.expiresIn;

          this.setAuthTimer(expiresInDuration)
          this.isAuthencated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration *1000)
          console.log('expirationDate', expirationDate);

          this.saveAuthData(result, expirationDate)

          this.router.navigate(['/'])
        }
      }, error => {
        this.authStatusListener.next(false)
      })
  }

  autoAuthUser(){
    const authInformation= this.getAuthData()
    if(!authInformation){
      return
    }

    const now = new Date();
    const expiresIn = authInformation.expiresInDate.getTime() - now.getTime();

    if(expiresIn > 0){
      this.token =authInformation.token
      this.isAuthencated = true;
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
      this.router.navigate(['/'])
    }else{
      // this.router.navigate(['/login'])
    }
  }

  getLoggedinDetails(){
    const userData:any = localStorage.getItem('userData')
    if(!userData){
      return ''
    }
    return JSON.parse(userData)

  }

  logout(){
    this.token = null;
    this.isAuthencated = false;
    this.authStatusListener.next(false);
    localStorage.removeItem("userData");
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/login'])
  }

  private setAuthTimer(duration:number){
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);
  }

  private saveAuthData(result:any, expirationDate:Date){
    localStorage.setItem("userData", JSON.stringify(result.userData))
    localStorage.setItem("expiration", expirationDate.toISOString())
  }

  private clearAuthData(){
    localStorage.removeItem("userData")
    localStorage.removeItem("expiration")

  }

  private getAuthData(){
    const userData:any = localStorage.getItem('userData')
    if(!userData){
      return
    }
    let token = JSON.parse(userData).userToken;
    let expiresInDuration = localStorage.getItem('expiration');
    if(!token || !expiresInDuration){
      return
    }
    return{
      token:token,
      expiresInDate:new Date(expiresInDuration)
    }
  }
}
