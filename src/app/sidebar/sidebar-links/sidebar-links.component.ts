import { Component, OnInit } from '@angular/core';
import { RedditDataService } from '../../services/reddit-data.service';
import { Observable } from 'rxjs/Observable';
import { RedditLinks } from '../../interfaces/reddit-data';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.scss']
})
export class SidebarLinksComponent implements OnInit {

  response: RedditLinks[]; 
  serviceSubscription: Subscription; 
  errorMessage: any;

  currentPage: number;
  finalLinkName: string;

  date_difference: number;

  constructor(private _redditDataService: RedditDataService) { }

  ngOnInit(): void{
    this.currentPage=0;
    this.finalLinkName="";
    this.subscribeToObservable();
    this._redditDataService.sidebarLinkClicked=false;
  }

  //Subscribe to RedditDataService's getLinkData() Observable.
  subscribeToObservable(): void{
    //Storing Subscription so we can unsubscribe from the Observable once we have the data.
    this.serviceSubscription = this._redditDataService
    .getLinkData("https://www.reddit.com/", this.currentPage, this.finalLinkName)
    .subscribe(
      //Typecast JSON response to custom type RedditLinks.
      response => {
        (this.currentPage>0) ?
        Array.prototype.push.apply(this.response, <RedditLinks[]>response.data.children) :
        this.response = <RedditLinks[]>response.data.children;
      },
      error => this.errorMessage = <any>error,
      () => {
        this.currentPage++;
        this.finalLinkName = this.response[this.response.length-1].data.name;
        this.revoke_subscription();
      }
    );
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

  //Load more posts upon button click.
  loadPosts($event): void{
    this.subscribeToObservable();
  }

  //Unsubscribe from Observable.
  revoke_subscription(): void{
    this.serviceSubscription.unsubscribe();
  }

  //Upon clicking a link in the sidebar, set the current link to be shown in the service.
  setCurrentLink(currentLink: RedditLinks): void{
    
    this._redditDataService.setCurrentLink(currentLink);
    this._redditDataService.sidebarLinkClicked =true;
  }
}
