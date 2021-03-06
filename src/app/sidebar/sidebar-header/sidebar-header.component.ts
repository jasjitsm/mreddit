/*

Name: SidebarHeaderComponent

This component is responsible for broadcasting the current category and/or search term,
upon user interaction, to subscribed components.

*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedditDataService } from '../../services/reddit-data.service';

@Component({
  selector: 'sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent{

  postCategories: string[] = ["hot", "new", "rising", "top", "controversial"];
  selectedCategory: string;

  searchTerm: string;

  constructor(private _redditDataService: RedditDataService) {
    this.selectedCategory = "hot";
    this.searchTerm= "";
  }

  categoryClicked(clickedCategory: string): void{
    this._redditDataService.sendCurrentCategory(clickedCategory);
    this.selectedCategory = clickedCategory;
  }

  search(): void{
    this._redditDataService.sendSearchTerm(this.searchTerm);
    this.searchTerm="";
  }

}
