import { Component, OnInit, Input } from '@angular/core';
import { RedditComments } from '../../interfaces/reddit-data';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  @Input() comments: RedditComments[];

  constructor() { }

  ngOnInit() {
  }

}
