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

  subredditSubscription: Subscription;
  searchSubscription: Subscription;
  categorySubscription: Subscription;
  postSubscription: Subscription;

  response: RedditLinks[];
  currentSubreddit: string;
  currentPage: number;
  currentCategory: string;
  finalLinkName: string;
  searchTerm: string;
  // oldSearchTerm: string;

  showSidebarLinks: boolean;
  showSidebarSpinner: boolean;

  constructor(private _redditDataService: RedditDataService) { }

  ngOnInit(): void{
    this.currentPage=0;
    this.finalLinkName="";
    // this.oldSearchTerm="";
    this.currentSubreddit="";

    this.showLoadingSpinner(true, true)

    this.subscribeToSearchTerm();
    this.subscribeToSubreddit();
    this.subscribeToCurrentCategory();
    this.subscribeToPosts();
  }

  subscribeToSubreddit(): void{
    this.subredditSubscription = this._redditDataService
    .getCurrentSubreddit()
    .subscribe(
      currentSubreddit =>  {
        this.showLoadingSpinner(true, true);
        this.currentSubreddit = currentSubreddit;
        this.currentPage = 0;
        this.subscribeToPosts();
      }
    );
  }

  subscribeToSearchTerm(): void{
    this.searchSubscription = this._redditDataService
    .getSearchTerm()
    .subscribe(
      searchTerm =>  {
        this.showLoadingSpinner(true, true);
        this.searchTerm = searchTerm;
        this.currentPage = 0;
        this.subscribeToPosts();
      }
    );
  }

  subscribeToCurrentCategory(): void{
    this.categorySubscription = this._redditDataService
    .getCurrentCategory()
    .subscribe(
      currentCategory =>  {
        this.showLoadingSpinner(true, true);
        this.currentCategory = currentCategory;
        this.currentPage = 0;
        this.subscribeToPosts();
      }
    );
  }

  //Subscribe to RedditDataService's getLinkData() Observable.
  subscribeToPosts(): void{
    this.postSubscription = this._redditDataService
    .getLinkData("https://www.reddit.com/", this.currentPage, this.currentSubreddit, this.currentCategory, this.finalLinkName, this.searchTerm)
    .subscribe(
      response => {
        (this.currentPage>0) ?
        Array.prototype.push.apply(this.response, <RedditLinks[]>response.data.children) :
        this.response = <RedditLinks[]>response.data.children;
      }, undefined,
      () => {
        // this.oldSearchTerm=this.searchTerm;
        this.showLoadingSpinner(false);
        this.finalLinkName = this.response[this.response.length-1].data.name;
        this.revoke_subscription(this.postSubscription);
      }
    );
  }

  //Load more posts upon button click.
  loadPosts($event): void{
    this.currentPage++;
    // if(this.currentPage>0 && this.oldSearchTerm==this.searchTerm) this.oldSearchTerm="";
    this.showLoadingSpinner(true);
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

  showLoadingSpinner(show: boolean, hideLinksAlso?: boolean): void{
    if(show){
      if(hideLinksAlso) this.showSidebarLinks = false;
      this.showSidebarSpinner = true;
    }
    if(!show){
      this.showSidebarLinks = true;
      this.showSidebarSpinner = false;
    }
  }
}
