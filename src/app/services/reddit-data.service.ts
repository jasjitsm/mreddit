import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class RedditDataService {

  private redditHomeUrl = "https://www.reddit.com/.json?raw_json=1";

  constructor(private _http:HttpClient) {

  }

  getLinks(): Observable<any[]>{
    return this._http.get<any[]>(this.redditHomeUrl)
      // .do(data => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
