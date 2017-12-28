/*

Name: CommentsListComponent

This component acts as a wrapper for the entire list of comments.
It passes comment data received from the ArticleMainComponent down to individual comment components.

*/

import { Component, OnInit, Input } from '@angular/core';
import { RedditComments } from '../../interfaces/reddit-data';

@Component({
  selector: 'comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent{

  @Input() comments: RedditComments[];

  constructor() { }

}
