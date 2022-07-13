import { Component, OnInit, VERSION, Version } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appMovie';

  name="Angular"+VERSION.major;

  constructor(private authservice:AuthService){

  }

  ngOnInit(): void {

      this.authservice.autoLogin();
  }
}
