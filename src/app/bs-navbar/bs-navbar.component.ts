/*

Name: BsNavbarComponent

This component contains the navigation bar, built using ng-bootstrap directives.
It is responsible for broadcasting to all subcribed components that a new subreddit has been selected from the dropdown menu.

*/

import { Component, HostListener } from '@angular/core';
import { RedditDataService } from '../services/reddit-data.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})

export class BsNavbarComponent{
  
  dropdownList: any[];
  currentSubreddit: string;

  constructor(private _redditDataService: RedditDataService) {
    this.dropdownList = [
      {title: "Front Page", subreddit: ""},
      {title: "Funny", subreddit: "r/funny"},
      {title: "Science", subreddit: "r/science"},
      {title: "Gaming", subreddit: "r/gaming"},
      {title: "Videos", subreddit: "r/videos"},
      {title: "Books", subreddit: "r/books"},
      {title: "Television", subreddit: "r/television"},
      {title: "World News", subreddit: "r/worldnews"}
    ];
    this.currentSubreddit = "Front Page";
  }

  dropdownClicked(subreddit: any): void{
    this.currentSubreddit = subreddit.title;
    this._redditDataService.sendCurrentSubreddit(subreddit.subreddit);
  }

}