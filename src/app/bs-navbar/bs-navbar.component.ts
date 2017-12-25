import { Component, HostListener } from '@angular/core';
import { RedditDataService } from '../services/reddit-data.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})

export class BsNavbarComponent{
  
  // isMobile: boolean;
  dropdownList: any[];
  currentSubreddit: string;

  constructor(private _redditDataService: RedditDataService) {
    // this.isMobile=this.fnIsMobile();
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
    this.currentSubreddit = "Front Page"
  }

  dropdownClicked(subreddit: any): void{
    this.currentSubreddit = subreddit.title;
    this._redditDataService.sendCurrentSubreddit(subreddit.subreddit);
  }

  // fnIsMobile(): boolean{
  //   if(window.innerWidth<768) return true;
  // }

  //Show full logo or smaller icon in navbar based on screen width
  // @HostListener('window:resize')
  // onResize(event) {
  //   this.isMobile=this.fnIsMobile();
  //   console.log("Resized");
  // }
}
