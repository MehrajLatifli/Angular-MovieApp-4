import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './movie';

import { AlertifyService } from '../services/alertify-service.service';
import { Movieservice } from './movieservice.service';
import { AuthService } from '../auth/auth.service';

// declare let alertify:any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers:[Movieservice]
})
export class MoviesComponent implements OnInit {

  constructor(private alertify: AlertifyService, private movieservice: Movieservice, private activatedroute:ActivatedRoute, private authservice: AuthService) {
    // this.movieRepository = new MovieRepository();
    // this.movies = this.movieRepository.getMovies();
    // this.popularMovies = this.movieRepository.getPopularMovies();

    this.alerti=alertify;
  }

  alerti:any;
public movieError:any;
userlistmovies:string[]=[];

userId:any;

loading:boolean=false;

  ngOnInit(): void {


    this.authservice.user.subscribe(user=>{

      if(user){

        this.userId = user.id;

        this.activatedroute.params.subscribe(params => {

          this.loading = true;

          var value = params["categoryId"]

          this.movieservice.getMovies(value).subscribe(data => {
            this.movies = data;


            this.movieservice.getMyList(this.userId).subscribe(data => {

              this.userlistmovies = data;

            }, error => { this.movieError = error; console.log(error) });

            this.loading = false;

            this.popularMovies = this.movies.filter(i => i.isPopular);
          }, error => { this.movieError = error; console.log(error) });

      });


    }

    });

  }

  movies: Movie[]=[];

  popularMovies: Movie[]=[];

  title: string = "Movie list"

  filterText: string = '';
  filteredMovies: Movie[];

  OnInputChange() {
    // this.filteredMovies = this.filterText
    //   ? this.movies.filter(
    //     (m: Movie) =>
    //       m.title.toLocaleLowerCase().indexOf(this.filterText) !== -1 ||
    //       m.description.toLocaleLowerCase().indexOf(this.filterText) !== -1
    //   )
    //   : this.movies;

    // console.log(this.filteredMovies);
  }


  getButtonState(item:any)
  {
    return this.userlistmovies.findIndex(m=>m===item.id)>-1
  }

  addtoList($event:any, item:Movie) {

    if($event.target.classList.contains('btn-primary'))
    {
      $event.target.innerText=item.title+ " Remove from List";
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');

    //  alertify.success(item.title+ " Add to List");

    //this.alerti.success(item.title);

    this.movieservice.addtoMyList({userId:this.userId, movieId:item.id}).subscribe(()=> this.alerti.success(item.title+ " Add to List"))

    }
    else{
      $event.target.innerText=item.title+ " Add to List";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');

    //  alertify.warning(item.title+ " Remove from List");

    // this.alerti.error(item.title);

    this.movieservice.removetoMyList({userId:this.userId, movieId:item.id}).subscribe(()=> this.alerti.error(item.title+ " Remove from List"))

    }

  }


  closeDialog(event: any) {
    alert(event);

    this.movieError = null;
  }

}
