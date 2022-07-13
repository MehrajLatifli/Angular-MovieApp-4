import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';
import { MovieDetailsComponent } from '../movies/movie-details/movie-details.component';
import { MovieCreateComponent } from '../movies/movie-create/movie-create.component';
import { CategoryCreateComponent } from '../category/category-create/category-create.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuardCanActivate } from '../auth/guards/auth.guard';
import { MoviesHomeComponent } from '../movies/movies-home/movies-home/movies-home.component';

const routes:Routes=[



  {path:'',redirectTo:'auth',pathMatch:'full'},

]

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
