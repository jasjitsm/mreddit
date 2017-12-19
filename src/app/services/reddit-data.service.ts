import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RedditLinks } from '../interfaces/reddit-data';

@Injectable()
export class RedditDataService {

  urlParams: string = "";
  currentLink: RedditLinks;
  sidebarLinkClicked: boolean;

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
  setCurrentLink(clickedLink: RedditLinks): void{
    this.currentLink = clickedLink;
  }
  getCurrentLink(): RedditLinks{
    return this.currentLink;
  }

}
