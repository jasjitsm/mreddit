export interface StackInterface{
    push(value: any): void;
    pop(): any;
    peek(): any;
    isEmpty(): boolean;
}

export class Stack implements StackInterface{

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