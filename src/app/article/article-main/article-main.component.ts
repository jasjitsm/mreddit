import { Component, OnDestroy } from '@angular/core';
import { RedditLinks } from '../../interfaces/reddit-data';
import { RedditDataService } from '../../services/reddit-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'article-main',
  templateUrl: './article-main.component.html',
  styleUrls: ['./article-main.component.scss']
})

export class ArticleMainComponent implements OnDestroy {

  currentLink: RedditLinks;
  serviceSubscription: Subscription;

  constructor(private _redditDataService: RedditDataService) {
    this.serviceSubscription = this._redditDataService
      .getCurrentLink()
      .subscribe(currentLink => { this.currentLink = currentLink; });
  }

  //Unsubscribe to prevent memory leaks in case of routing (if added in the future).
  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }

}
