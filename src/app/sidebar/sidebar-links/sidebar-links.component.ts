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
  categorySubscription: Subscription;
  postSubscription: Subscription;
  errorMessage: any;

  currentPage: number;
  currentCategory: string;
  finalLinkName: string;

  constructor(private _redditDataService: RedditDataService) { }

  ngOnInit(): void{
    this.currentPage=0;
    this.finalLinkName="";
    this.subscribeToCurrentCategory();
    this.subscribeToPosts();
  }

  subscribeToCurrentCategory(): void{
    this.categorySubscription = this._redditDataService
    .getCurrentCategory()
    .subscribe(
      currentCategory =>  {
        this.currentCategory = currentCategory;
        this.currentPage = 0;
        this.subscribeToPosts();
      },
      () => {
        
      }
    );
  }

  //Subscribe to RedditDataService's getLinkData() Observable.
  subscribeToPosts(): void{
    this.postSubscription = this._redditDataService
    .getLinkData("https://www.reddit.com/", this.currentPage, this.currentCategory, this.finalLinkName)
    .subscribe(
      response => {
        (this.currentPage>0) ?
        Array.prototype.push.apply(this.response, <RedditLinks[]>response.data.children) :
        this.response = <RedditLinks[]>response.data.children;
      },
      error => this.errorMessage = <any>error,
      () => {
        this.finalLinkName = this.response[this.response.length-1].data.name;
        this.revoke_subscription(this.postSubscription);
      }
    );
  }

  //Load more posts upon button click.
  loadPosts($event): void{
    this.currentPage++;
    this.subscribeToPosts();
  }

  //Unsubscribe from Observable.
  revoke_subscription(subscription: Subscription): void{
    subscription.unsubscribe();
  }

  //Upon clicking a link in the sidebar, tell the Subject to broadcast the current link to all subscribed components.
  setCurrentLink(clickedLink: RedditLinks): void{
    this._redditDataService.sendCurrentLink(clickedLink);
  }
}
