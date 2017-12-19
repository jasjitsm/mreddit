//Core Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

//Custom Environment Imports
import { environment } from '../environments/environment';

//Custom Component Imports
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarLinksComponent } from './sidebar/sidebar-links/sidebar-links.component';
import { ArticleMainComponent } from './article/article-main/article-main.component';
import { CommentsListComponent } from './article/comments-list/comments-list.component';
import { CommentsSingleComponent } from './article/comments-single/comments-single.component';

//Custom Service Imports
import { RedditDataService } from './services/reddit-data.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    SidebarHeaderComponent,
    SidebarLinksComponent,
    ArticleMainComponent,
    CommentsListComponent,
    CommentsSingleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [RedditDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
