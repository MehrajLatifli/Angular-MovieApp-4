import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category-service.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {

      categories:Category[]=[];
      category:Category;
      // categoryRepository:CategoryRepository;
       selectedcategory:Category=null;

  constructor(private categoryservice: CategoryService) {

    // this.categoryRepository=new CategoryRepository();
    // this.categories=this.categoryRepository.getCategories();
  }


  ngOnInit(): void {

    this.categoryservice.getCategory().subscribe(data=>{
      this.categories=data;
    },error=>{console.log(error)});




    // this.categoryservice.postCategory().toPromise().then(data => {
    //   console.log(this.categories);
    // })

    var replacedata    =   {id:7, categoryname:"Mehj"}

    // this.categoryservice.putCategory(replacedata).subscribe(data=>{
    //   this.category=data;
    // });

    // this.categoryservice.deleteCategory(replacedata).subscribe(data=>{
    //   this.category=data;
    // });

    // this.categoryservice.putCategory(replacedata).subscribe({
    //   next: data => {
    //     this.categories = data;
    //   },
    //   error: error => {

    //     console.error('There was an error!', error.message);
    //   }
    // });

  }

  displayAll:boolean=true;

  selectCategory(item?:any)
  {
    if(item)
    {
      this.selectedcategory=item;
      this.displayAll=false;
    }
    else{
      this.selectedcategory=null;
      this.displayAll=true;
    }



  }


}
