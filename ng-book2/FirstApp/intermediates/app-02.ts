import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';

@Component({
    selector: 'reddit-article',
    host: {
        class: 'row'
    },
    template: `
    <div class="four wide column center aligned votes">
        <div class="ui static">
            <div class="value">
                {{votes}}
            </div>
            <div class="label">
                Points
            </div>
        </div>
    </div>
    <div class="twelve wide column">
        <a class="ui large header" href="{{ link }}">
            {{ title }}
        </a>
        <ul class="ui big horizontal list votes">
            <li class="item">
                <a href (click)="voteUp()">
                    <i class="arrow up icon">
                        upvote
                    </i>
                </a>
            </li>
            <li class="item">
                <a href (click)="voteDown()">
                    <i class="arrow down icon">
                        downvote
                    </i>
                </a>
            </li>
        </ul>
    </div>
    `
})

class ArticleComponent {
    votes: number;
    title: string;
    link: string;

    constructor(){
        this.title = 'Angular 2';
        this.link = 'http://angular.io';
        this.votes = 10;
    }

    voteUp() {
        this.votes++;
        return false;
    }

    voteUp() {
        this.votes--;
        return false;
    }
}
