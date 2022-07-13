
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterModule } from "@angular/router";

import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieComponent } from "./movie/movie.component";
import { MoviesHomeComponent } from "./movies-home/movies-home/movies-home.component";
import { MoviesComponent } from "./movies.component";
import { MovieFilterPipe } from "./Pipes/movie-filter.pipe";
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from "./movies-routing.module";
import { CategoriesModule } from '../category/categories.module';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [

    MoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    MovieFilterPipe,
    MovieCreateComponent,
    MoviesHomeComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MoviesRoutingModule,
    CategoriesModule,
    SharedModule,
  ],
  exports: [
    MoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    MovieFilterPipe,
    MovieCreateComponent,
    MoviesHomeComponent,
  ]
})


export class MoviesModule { }
