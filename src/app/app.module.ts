import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { SidebarWrapperComponent } from './sidebar/sidebar-wrapper/sidebar-wrapper.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarLinksComponent } from './sidebar/sidebar-links/sidebar-links.component';
import { ArticleMainComponent } from './article/article-main/article-main.component';
import { ArticleDescriptionComponent } from './article/article-description/article-description.component';
import { CommentsListComponent } from './article/comments-list/comments-list.component';
import { CommentsSingleComponent } from './article/comments-single/comments-single.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    SidebarWrapperComponent,
    SidebarHeaderComponent,
    SidebarLinksComponent,
    ArticleMainComponent,
    ArticleDescriptionComponent,
    CommentsListComponent,
    CommentsSingleComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
