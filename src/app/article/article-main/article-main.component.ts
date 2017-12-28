/*

Name: ArticleMainComponent

This component listens to the event emitted when the user clicks on a sidebar link.
Once the event fires, the article panel is loaded into the DOM.
Elements values are data-bound and utilize link objects values once received.
Comments are fetched once the article header has loaded.

*/

import { Component, OnDestroy } from '@angular/core';
import { RedditLinks, RedditComments } from '../../interfaces/reddit-data';
import { RedditDataService } from '../../services/reddit-data.service';
import { Subscription } from 'rxjs/Subscription';
import { Stack } from '../../interfaces/stack';

@Component({
  selector: 'article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss']
})

export class ArticleMainComponent implements OnDestroy {

  currentLink: RedditLinks;
  linkSubscription: Subscription;

  commentSubscription: Subscription;
  comments: RedditComments;
  comments_reorganized: RedditComments[];
  commentsLoaded: boolean;

  

  constructor(private _redditDataService: RedditDataService) {
    this.commentsLoaded= false;
    this.subscribeToCurrentLink();
  }

  subscribeToCurrentLink(): void{
    this.linkSubscription = this._redditDataService
    .getCurrentLink()
    .subscribe( currentLink =>  {
      this.currentLink = currentLink;
      if(this.currentLink!=null) this.subscribeToComments();
    });
  }

  subscribeToComments(): void{
    this.commentsLoaded = false;
    this.commentSubscription = this._redditDataService
    .getLinkData("https://www.reddit.com"+this.currentLink.data.permalink)
    .subscribe(
      response => {
        this.comments = <RedditComments>response[1];
        this.reorganize_comments(this.comments);
      } , undefined,
      () => {
        this.commentsLoaded = true;
        this.revoke_subscription();
      }
    );
  }

  reorganize_comments(root: RedditComments){
    this.comments_reorganized=[];
    var stack: Stack = new Stack();

    var numRootComments = root.data.children.length;
    var rootCopy: RedditComments = root;

    for(var topLevelComments = 0; topLevelComments<numRootComments; topLevelComments++){
      stack.push(rootCopy.data.children[topLevelComments]);
      while(!stack.isEmpty()){
        root=stack.pop();
        this.comments_reorganized.push(root);
        if(root.data.replies!=null && root.data.replies!="" && root.data.replies!=undefined){
          for(var i=root.data.replies.data.children.length-1; i>=0; i--){
            if(root.data.replies.data.children[i].kind!="more") stack.push(root.data.replies.data.children[i]);
          }
        }
      }
    }
  }

  calcDate(created_utc: number): string{
    return this._redditDataService.calcDate(created_utc);
  }

  isImage(image_url: string): boolean{
    return this._redditDataService.isImage(image_url);
  }

  ngOnDestroy() {
    this.linkSubscription.unsubscribe();
  }

  revoke_subscription(): void{
    this.commentSubscription.unsubscribe();
  }

}
