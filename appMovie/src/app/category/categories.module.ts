import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuardCanActivate } from "../auth/guards/auth.guard";
import { MoviesRoutingModule } from "../movies/movies-routing.module";
import { CategoryCreateComponent } from "./category-create/category-create.component";
import { CategoryComponent } from "./category.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations:[
    CategoryComponent,
    CategoryCreateComponent,

  ],
  imports:[
    RouterModule.forChild([

      {path:'categories/create',component:CategoryCreateComponent,canActivate:[AuthGuardCanActivate]},

    ]),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MoviesRoutingModule,
    SharedModule,
  ],
  exports:[
    CategoryComponent,
    CategoryCreateComponent,
  ]
})


export class CategoriesModule{

}
