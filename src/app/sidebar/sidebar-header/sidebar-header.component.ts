import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedditDataService } from '../../services/reddit-data.service';

@Component({
  selector: 'sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent implements OnInit {

  postCategories: string[] = ["hot", "new", "rising", "top", "controversial"];
  selectedCategory: string;

  constructor(private _redditDataService: RedditDataService) {
    this.selectedCategory = "hot";
  }

  ngOnInit() {
  }

  //Upon clicking a link in the sidebar, tell the Subject to broadcast the current link to all subscribed components.
  categoryClicked(clickedCategory: string): void{
    this._redditDataService.sendCurrentCategory(clickedCategory);
    this.selectedCategory = clickedCategory;
  }

}
