import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from './Models/AuthResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  isLoginMode:boolean=true;
  public Error:any;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  OnToggleMode(){

    this.isLoginMode=!this.isLoginMode;

  }


  closeDialog(event: any) {
    alert(event);

    this.Error = null;
  }



  onSubmit(form:NgForm) {


    const email= form.value.email;
    const password= form.value.password;


    if(form.invalid)
    {
      return;
    }

    let authResponse:Observable<AuthResponse>;

    if(this.isLoginMode)
    {

     authResponse =this.authService.logIn(email,password);


   //  this.authService.logIn(email,password).subscribe(response=>{console.log(response)}, err=>{console.log(err)});




    }
    else{


      authResponse = this.authService.singUp(email,password);

    //  this.authService.singUp(email,password).subscribe(response=>{console.log(response)}, err=>{console.log(err)});



    }


     authResponse.subscribe(response=> {this.router.navigate['/movies']}, err=>{this.Error=err; console.log(err)});



  }

}
