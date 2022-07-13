import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MoviesRoutingModule } from "../movies/movies-routing.module";
import { AuthComponent } from "./auth.component";
import { SharedModule } from '../shared/shared.module';


@NgModule({

  declarations:[
    AuthComponent],
  imports:[
    RouterModule.forChild([

      {path:'auth',component:AuthComponent}

    ]),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule

  ],
  exports:[AuthComponent]
})


export class AuthModule{

}
