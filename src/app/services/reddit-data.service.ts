import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RedditLinks } from '../interfaces/reddit-data';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RedditDataService {

  sidebarClicked = new Subject<any>();
  categoryClicked = new Subject<any>();

  date_difference: number;

  constructor(private _http:HttpClient) { }

  //Returns an Observable with 25 Reddit post Objects.
  getLinkData(urlToScrape: string, page?: number, currentCategory?: string, finalLinkName?: string): Observable<any>{
    if(currentCategory) urlToScrape+=(currentCategory+"/");
    urlToScrape+=".json?raw_json=1";
    if (page>0){
      urlToScrape +=
        ("?count="+page*25)
        + "&after="+finalLinkName;
    }
    return this._http.get(urlToScrape);
  }

  //Subject methods to pass data between components that share this service in common.
  sendCurrentLink(clickedLink: RedditLinks) {
    this.sidebarClicked.next(clickedLink);
  }
  getCurrentLink(): Observable<any> {
    return this.sidebarClicked.asObservable();
  }

  sendCurrentCategory(clickedCategory: string){
    this.categoryClicked.next(clickedCategory);
  }
  getCurrentCategory(): Observable<any> {
    return this.categoryClicked.asObservable();
  }
  

  









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
    else if(Math.round(this.date_difference/(60*1000))>0){
      this.date_difference = Math.round(this.date_difference/(60*1000));
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
