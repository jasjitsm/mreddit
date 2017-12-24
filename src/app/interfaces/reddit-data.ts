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




export interface Collection{
    push(value: any): void;
    pop(): any;
    peek(): any;
    isEmpty(): boolean;
}

export class Stack implements Collection{
    top: any;

    constructor(){
        this.top=null;
    }

    push(value: any){
        this.top = {
            value: value,
            next: this.top
        };
    }

    pop(){
        var value = this.top.value;
        this.top = this.top.next;
        return value;
    }

    peek(){
        return this.top.value;
    }

    isEmpty(){
        return this.top === null;
    }
}