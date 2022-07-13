import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable,tap, throwError } from 'rxjs';
import { Movie } from './movie';
import { MyList } from './mylist';

@Injectable({
  providedIn: 'root'
})
export class Movieservice {

  constructor(private http:HttpClient) {

  }

  url="http://localhost:3000/movies";

  url_firebase="https://angularmovieapp-3f4d5-default-rtdb.firebaseio.com/";

  getMovies(categoryId:number):Observable<Movie[]>{

    let newurl=this.url_firebase+"movies.json";

    if(categoryId)
    {
      newurl+='?categoryId='+categoryId;
    }

    return  this.http.get<Movie[]>(newurl).pipe(
      map(response=> {

        const movies:Movie[]=[];

        for (let key in response) {

          if(categoryId)
          {
            if(categoryId==response[key].categoryId)
            {
              movies.push({...response[key],id:key});
            }
          }
          else
          {

            movies.push({...response[key],id:key});
          }

        }

        return movies;
      }),
      tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));
  }


  getMovieById(movieId:any):Observable<Movie>{



    return  this.http.get<Movie>(this.url_firebase+"movies/"+movieId+".json").pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));
  }

  postMovie(movie:any):Observable<any>{


    const httpOption={

      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })

    }

    return  this.http.post<any>(this.url_firebase+"movies.json",movie,httpOption).pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));
  }

  addtoMyList(item:MyList):Observable<MyList>{
    return this.http.post<MyList>(this.url_firebase+"/users/"+item.userId+"/list/"+item.movieId+".json",
    {
      dateAdded:new Date().getTime()
    }).pipe(
      tap(data=>console.log(data)),
      catchError(this.HandleError)
    )
  }

  removetoMyList(item:MyList):Observable<MyList>{
    return this.http.delete<MyList>(this.url_firebase+"/users/"+item.userId+"/list/"+item.movieId+".json",
    ).pipe(
      tap(data=>console.log(data)),
      catchError(this.HandleError)
    )
  }

  getMyList(userId:string):Observable<string[]>{

    return this.http.get<string[]>(this.url_firebase+"/users/"+userId+"/list.json")
    .pipe(
     map(response=>{

      const movies:string[]=[];

      for(const key in response)
      {
        movies.push(key);
      }

      return movies;

     }),
     tap(data=>console.log(data)),
     catchError(this.HandleError)

    )
  }

  private HandleError(error: HttpErrorResponse)
  {

    if(error.error instanceof ErrorEvent)
    {

      console.log("Error: "+ error.error.message);

    }
    else{

      switch (error.status) {
        case 404:
          console.log("404 Error: \n"+ error.message);
          break;

          case 403:
            console.log("403 Error: \n"+ error.message);
           break;

           case 500:
            console.log("500 Error: \n"+ error.message);
           break;

        default:
          console.log("Some unknow Error: \n"+ error.message);
      }
    }
    return throwError(()=>new Error ("from HandleError: "+error.message));
  }

}
