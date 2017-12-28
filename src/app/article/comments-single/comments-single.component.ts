/*

Name: CommentsSingleComponent

This component displays a single comment using data retrieved from CommentsListComponent.

*/

import { Component, OnInit, Input } from '@angular/core';
import { RedditComments } from '../../interfaces/reddit-data';
import { RedditDataService } from '../../services/reddit-data.service';

@Component({
  selector: 'comments-single',
  templateUrl: './comments-single.component.html',
  styleUrls: ['./comments-single.component.scss']
})
export class CommentsSingleComponent{

  @Input() comment: RedditComments;

  constructor(private _redditDataService: RedditDataService) { }

  getMargin(depth: number): string{
    return depth*20 + "px";
  }

  calcDate(created_utc: number): string{
    return this._redditDataService.calcDate(created_utc);
  }

}
