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

  constructor(private _redditDataService: RedditDataService) { }

  ngOnInit(): void{
    this.currentPage=0;
    this.finalLinkName="";
    this.subscribeToObservable();
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

  //Load more posts upon button click.
  loadPosts($event): void{
    this.subscribeToObservable();
  }

  //Unsubscribe from Observable.
  revoke_subscription(): void{
    this.serviceSubscription.unsubscribe();
  }

  //Upon clicking a link in the sidebar, tell the Subject to broadcast the current link to all subscribed components.
  setCurrentLink(clickedLink: RedditLinks): void{
    this._redditDataService.sendCurrentLink(clickedLink);
  }
}
