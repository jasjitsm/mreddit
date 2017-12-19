import { Component, OnInit } from '@angular/core';
import { RedditLinks } from '../../interfaces/reddit-data';
import { RedditDataService } from '../../services/reddit-data.service';

@Component({
  selector: 'article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss']
})
export class ArticleMainComponent implements OnInit {

  // currentLink: RedditLinks;

  constructor(private _redditDataService: RedditDataService) {
    // this.currentLink=this._redditDataService.getCurrentLink();
  }

  ngOnInit() {

  }

}
