import { Component, OnInit } from '@angular/core';

import { Category } from '../../category/category';
import { Movieservice } from '../movieservice.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../services/alertify-service.service';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category/category-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, Movieservice, AlertifyService]
})
export class MovieCreateComponent implements OnInit {

  categories: Category[] = [];

  model:any={categoryId:-1};

  file:any;

  urlimage:any;

 async getfile(event:any) {

    this.file=event.target.files[0];

  }


  uploadSignature(vals): Observable<any>{
    let data = vals;
    return this.http.post('https://api.cloudinary.com/v1_1/sociala/upload',data)
  }

  constructor(private categoryService: CategoryService, private movieservice: Movieservice, private alertifyService: AlertifyService, private router: Router, private http:HttpClient) { }

  ngOnInit(): void {

    this.categoryService.getCategory().subscribe(data => { this.categories = data });
  }



  movieform = new FormGroup({

    title_: new FormControl("Movie title",[Validators.required, Validators.minLength(5)]),
    description_: new FormControl("Movie description",[Validators.required]),
    imageUrl_: new FormControl("../../../assets/Images/image.png",[Validators.required]),
    categoryId_: new FormControl("-1",[Validators.required]),
    subimageUrl_: new FormControl("",[Validators.required])

  });

  isFormValid() : boolean {
    return this.movieform.disabled ? true : this.movieform.valid
  }

 async createMovie3(){


    let formData=new FormData();

    formData.set('file', this.file);

    formData.append("file", this.file);

    formData.append("upload_preset", "angular-movies");

   this.uploadSignature(formData).subscribe((imageData) => {
    this.urlimage = imageData.url;

    console.log(this.urlimage);


    const movie = {
      title: this.movieform.value.title_,
      description: this.movieform.value.description_,
      imageUrl: this.movieform.value.imageUrl_,
      isPopular: false,
      datePublished: new Date().getTime(),
      categoryId: this.movieform.value.categoryId_,
      subimageUrl: this.urlimage,
    }




    if(this.movieform.value.title_!="" && this.movieform.value.description_!=""  && this.movieform.value.imageUrl_!=""  && this.movieform.value.categoryId_!="")
    {




      this.movieservice.postMovie(movie).subscribe(data => {console.log(data); this.router.navigate(['/movies'])});

      this.alertifyService.success(movie.title);

    }
  })





  }

  ClearForm(){

    this.movieform.patchValue({

      title_: '',
      description_: '',
      imageUrl_: '',
      categoryId_:'-1',

    });

  }
}
