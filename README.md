# Minimal Reddit

## Purpose

Reddit is one of the most popular websites on the entire internet (ranked the 35th most visited website globally at the time of writing), and it looks...well, horrendous. As the mobile experience improves (as one should expect), desktop apps tend to fall by the wayside.

Minimal Reddit is an experimental single page Angular web app that reimagines the way Reddit looks and functions on desktop interfaces. It’s a sleek, minimal recreation that utilizes the extra screen real estate non-mobile devices to provide a more enjoyable Reddit experience.

I built it as an excuse to show off the versatility and ease of development Angular, and the MVC architecture in general, provides when creating single page applications. And I also just wanted to work with the rather haphazard Reddit API.

## How It Works

The app uses `Observables` to makes asynchronous calls to the Reddit API. The data is received via a `Service` and injected at runtime to dependant `Components`. Data bound elements are then populated, and change accordingly as the data stream is altered by the user.

Users can select the subreddit, category (“hot”, “new”, etc), and/or search for posts. Clicking on any of the loaded posts in the sidebar with load the post’s relevant details and entire comments section in the pane on the right, without having to reload the page. And, of course, users can also load more posts in the sidebar dynamically by clicking the “Load More Posts” button.


## Notes

Firstly, because the purpose of this app was to show off Angular’s capabilities, and because Angular like to have a strict level abstraction between DOM elements and the logic, I have refrained from interacting directly with the DOM, and hence have not used JQuery. Everything, from animations to data requests, is handled by Angular.

Secondly, because I have chosen to forgo using API wrappers, am unfamiliar with Node, and am working directly with the messy API, I’ve omitted functions which require Oauth access for now.

And thirdly, I don’t usually liberally sprinkle comments all my code (it’s just bad practice) like subtitles, but because the aforementioned reasons, in this case I made an exception.

## Tools Used

**Design:** Sketch, Photoshop

**Frontend:** Angular (w/ Typescript), Bootstrap

**Backend:** Firebase

**Misc:** Prepros, Github, VS Code

