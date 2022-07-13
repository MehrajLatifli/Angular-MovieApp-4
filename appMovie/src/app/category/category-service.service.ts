import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../movies/movie';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url_firebase="https://angularmovieapp-3f4d5-default-rtdb.firebaseio.com/";

  constructor(private http:HttpClient) {

  }


  ngOnInit(): void {



  }

  getCategory():Observable<Category[]>{

    return  this.http.get<Category[]>(this.url_firebase+"categories.json").pipe(

      map(response=> {

      const categories: Category[]=[];

      for(const key in response)
      {
        categories.push({...response[key],id:key});
      }

      return categories;
    })

    );
  }

  hasValue=false;


  hasCategory(category: string) {

    let categories = this.getCategory().
      subscribe(c => {
        c.forEach(element => {

          for (let index = 0; index < c.length; index++) {

            const elem = c[index];

            if (elem.categoryname == category) {

              this.hasValue = true;
            }

          }

        });
      }
      )

    return this.hasValue;
  }


  postCategory(category:Category):Observable<Category[]>{


    const httpOption={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })
    }



    return  this.http.post<Category[]>(this.url_firebase+"categories.json",category,httpOption)

  }


}
