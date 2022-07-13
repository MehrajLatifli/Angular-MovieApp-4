import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Movieservice } from 'src/app/movies/movieservice.service';
import { Movie } from '../movie';
import { CommentService } from '../../services/comment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  PostComment } from '../../Models/comment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers:[Movieservice]
})
export class MovieDetailsComponent implements OnInit {

  movie:Movie;

   comments: PostComment[]=[];

   userId:any;

   useremail:any;

  constructor(private movieservice:Movieservice, private activatedRound:ActivatedRoute, private commentService:CommentService, private router:Router, private authservice:AuthService) { }

  ngOnInit(): void {

    this.activatedRound.params.subscribe(params=>{
      this.movieservice.getMovieById(params["movieId"]).subscribe(data=>{this.movie=data});
    })

    setInterval(() => {

      this.authservice.user.subscribe(user=>{

        if(user){

          this.userId = user.id;

          this.useremail=user.email;


          this.commentService.getComment().subscribe(data=>{

            this.comments=data;

            this.comments.forEach(element => {
              console.log(element);
            });

          },error=>{console.log(error)});


        }

      });

    }, 1000);





  }

  commentform = new FormGroup({

    commnettext: new FormControl("Comment",[Validators.required, Validators.minLength(1)]),



  });


  postComment()
  {
    const comment = {
      commnettext:this.commentform.value.commnettext,
      userId:this.userId,
      useremail:this.useremail
    }


    this.commentService.postComment(comment).subscribe(data => {console.log(data);});
  }

}
