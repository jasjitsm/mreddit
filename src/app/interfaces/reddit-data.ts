export interface RedditLinks {
    kind: string;
    data: {
        author: string;
        thumbnail: string;
        subreddit: string;
        permalink: string;
        url: string;
        title: string;
        is_video: boolean;
        created_utc: number;
        ups: number;
        num_comments: number;
        name: string;
    };
}

export interface RedditComments{
    kind: string;
    data: {
        gilded: number;
        author: string;
        ups: number;
        body: string;
        body_html: string;
        depth: number;
        created_utc: number;
        replies?: any;
        children?: RedditComments[];
    }
}