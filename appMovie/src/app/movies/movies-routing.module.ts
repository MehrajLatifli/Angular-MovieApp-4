import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardCanActivate } from "../auth/guards/auth.guard";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MoviesHomeComponent } from "./movies-home/movies-home/movies-home.component";
import { MoviesComponent } from "./movies.component";

const routes:Routes=[

  {
    path:'movies',
    component:MoviesHomeComponent,
    canActivate:[AuthGuardCanActivate],
    children:[
      {path:'',component:MoviesComponent},
      {path:'create',component:MovieCreateComponent},
      {path:'category/:categoryId',component:MoviesComponent},
      {path:':movieId',component:MovieDetailsComponent},

    ]
  },

];


@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})


export class MoviesRoutingModule{

}
