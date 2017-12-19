import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RedditLinks } from '../interfaces/reddit-data';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RedditDataService {

  urlParams: string = "";
  sidebarClicked = new Subject<any>();

  constructor(private _http:HttpClient) { }

  //Method that, when subscribed to, will return an Observable with 25 Reddit posts as Objects.
  getLinkData(urlToScrape: string, page?: number, finalLinkName?: string): Observable<any>{
    this.urlParams=(".json?raw_json=1");
    if (page>0){
      this.urlParams +=
        ("?count="+page*25)
        + "&after="+finalLinkName;
    }
    urlToScrape+=this.urlParams;
    return this._http.get(urlToScrape);
  }

  //Setter and Getter for the currently selected link in the sidebar.
  // setCurrentLink(clickedLink: RedditLinks): void{
  //   this.currentLink = clickedLink;
  // }

  sendCurrentLink(clickedLink: RedditLinks) {
    this.sidebarClicked.next(clickedLink);
  }

  getCurrentLink(): Observable<any> {
      return this.sidebarClicked.asObservable();
  }









  date_difference: number;
  
  //Calculate how long ago a post was added based on the UNIX Timestamp.
  calcDate(created_utc: number): string{
    
    this.date_difference = new Date().getTime()-new Date(created_utc*1000).getTime();

    if(Math.floor(this.date_difference/(24*60*60*1000))>0){
      this.date_difference = Math.floor(this.date_difference/(24*60*60*1000));
      return this.date_difference + " days";
    }
    else if(Math.floor(this.date_difference/(60*60*1000))>0){
      this.date_difference = Math.floor(this.date_difference/(60*60*1000));
      return this.date_difference + " hours";
    }
    else if(Math.floor(this.date_difference/(60*1000))>0){
      this.date_difference = Math.floor(this.date_difference/(60*60*1000));
      return this.date_difference + " minutes";
    }
    else return " a few seconds ago";
    
  }

  //In case a post doesn't have a thumbnail, display a generic default one.
  isImage(image_url: string): boolean{
    switch(image_url){
      case "default": return false;
      case "self": return false;
      case "image": return false;
      case "spoiler": return false;
      case "nsfw": return false;
    }
    return true;
  }

}
