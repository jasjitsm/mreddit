import { Component, OnInit } from '@angular/core';
import { RedditDataService } from '../../services/reddit-data.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.scss']
})
export class SidebarLinksComponent implements OnInit {

sidebarLinks: any[];
errorMessage: any;

  constructor(private _redditDataService: RedditDataService) { }

  ngOnInit(): void{
    this._redditDataService.getLinks()
    .subscribe(
      sidebarLinks => {
        this.sidebarLinks = sidebarLinks;
        console.log(this.sidebarLinks);
      },
      error => this.errorMessage = <any>error,
    );
  }

}
