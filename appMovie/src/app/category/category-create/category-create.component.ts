import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify-service.service';
import { CategoryService } from '../category-service.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers:[CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  createCategory(namevalue: string) {

    setTimeout(() => {

      const category: Category = {
        categoryname: namevalue
      };

      let hasvalue = this.categoryService.hasCategory(namevalue);

      if (!hasvalue) {
        const category: Category = {
          categoryname: namevalue
        }
        this.categoryService.postCategory(category).subscribe(data => { console.log(data); this.router.navigate(['/movies']) });
      }

      // else {
      //   this.alertify.warning(namevalue + " is already exist");
      // }





    }, 1000);



  }

}
