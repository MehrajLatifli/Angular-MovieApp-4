import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './Models/AuthResponse';
import { User } from './Models/user';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  key="AIzaSyAQcsWJHpQzTu2DOFkmse5o1Ltuwbrbc-I";
  SingUpUrl="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  SingInUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";


  user=new BehaviorSubject<User>(null);

  constructor(private http:HttpClient) {

  }

  singUp(email:string,password:string){
   return this.http.post<AuthResponse>(this.SingUpUrl+this.key,
      {
        email:email,
        password:password,
        returnSecureToken:true
      }).pipe(tap(response=>{
        const expirationDate=new Date(new Date().getTime()+(Number(response.expiresIn)*1000));
        const user= new User(response.email,response.localId,response.idToken, expirationDate);

        this.user.next(user);

        localStorage.setItem("user",JSON.stringify(user));

      //  this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn)

      }));
  }

  logIn(email:string,password:string){
    return this.http.post<AuthResponse>(this.SingInUrl+this.key,
       {
         email:email,
         password:password,
         returnSecureToken:true
       }).pipe(tap(response=>{
        const expirationDate=new Date(new Date().getTime()+(Number(response.expiresIn)*1000));
        const user= new User(response.email,response.localId,response.idToken, expirationDate);

        this.user.next(user);

        localStorage.setItem("user",JSON.stringify(user));

    //    this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn)

      }));
   }

   logout()
   {
    this.user.next(null);
    localStorage.setItem("user",JSON.stringify(null));
    localStorage.removeItem("user");
   }

   autoLogin()
   {
    const user:User= JSON.parse(localStorage.getItem("user"));

    if(!user)
    {
      return;
    }

    const loadedUser=new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpiration)
      );

      if(loadedUser.token)
      {
        this.user.next(loadedUser);
      }

   }

   handleAuthentication(email:string,userId:string,token:string,expiresIn:number)
   {

    const expirationDate=new Date(new Date().getTime()+(Number()*1000));
    const user= new User(email,userId,token, expirationDate);

    this.user.next(user);

    localStorage.setItem("user",JSON.stringify(user));

   }
}
