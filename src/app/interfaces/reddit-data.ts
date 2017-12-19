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