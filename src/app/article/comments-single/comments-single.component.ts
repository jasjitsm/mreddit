import { Component, OnInit, Input } from '@angular/core';
import { RedditComments } from '../../interfaces/reddit-data';
import { RedditDataService } from '../../services/reddit-data.service';

@Component({
  selector: 'comments-single',
  templateUrl: './comments-single.component.html',
  styleUrls: ['./comments-single.component.scss']
})
export class CommentsSingleComponent implements OnInit {

  @Input() comment: RedditComments;

  constructor(private _redditDataService: RedditDataService) { }

  ngOnInit() {
  }

  getMargin(depth: number): string{
    return depth*20 + "px";
  }

}
