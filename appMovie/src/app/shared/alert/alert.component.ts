import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieComponent } from '../../movies/movie/movie.component';
import { MoviesComponent } from '../../movies/movies.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  @Input("alertmessage") message:string;

  @Output() mycustomCloseEvent=new EventEmitter<string>();



  ngOnInit(): void {

  }

  onClose()
  {

    this.mycustomCloseEvent.emit("Work my custom CloseEvent");
  }
}
