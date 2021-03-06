// your code goes here
import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";

@Component({
    selector: 'reddit-article',
    inputs: ['article'],
    host: {
        class: 'row'
    },
    template: `
    <div class="four wide column center aligned votes">
        <div class="ui static">
            <div class="value">
                {{article.votes}}
            </div>
            <div class="label">
                Points
            </div>
        </div>
    </div>
    <div class="twelve wide column">
        <a class="ui large header" href="{{ article.link }}">
            {{ article.title }}
        </a>
        <div class="meta">{{ article.domain() }}</div>
        <ul class="ui big horizontal list voters">
            <li class="item">
                <a href (click)="voteUp()">
                    <i class="arrow up icon"></i>
                    upvote
                </a>
            </li>
            <li class="item">
                <a href (click)="voteDown()">
                    <i class="arrow down icon"></i>
                    downvote
                </a>
            </li>
        </ul>
    </div>
    `
})

class ArticleComponent {
    article: Article;

    constructor(){
        this.article = new Article('Angular 2', 'http://angular.io', 10);
    }

    voteUp(): boolean {
        this.article.voteUp();
        return false;
    }

    voteDown(): boolean {
        this.article.voteDown();
        return false;
    }
}

class Article {
    title: string;
    link: string;
    votes: number;

    constructor(title: string, link: string, votes?: number){
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }

    domain(): string {
        try {
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }

    voteUp(): void {
        this.votes++;
    }

    voteDown(): void {
        this.votes--;
    }
}

@Component({
    selector: 'reddit',
    directives: [ArticleComponent],
    template: `
    <form class="ui large form segment">
        <h3 class="ui header">Add a link</h3>

        <div class="field">
            <label for="title">Title:</label>
            <input id="title" name="title" #newtitle>
        </div>
        <div class="field">
            <label for="link">Link:</label>
            <input id="link" name="link" #newlink>
        </div>

        <button (click)="addArticle(newtitle, newlink)"
                class="ui positive right floated button">
            Submit link
        </button>
    </form>
    
    <form class="ui large form segment">
        <h3 class="ui header">Search</h3>

        <div class="field">
            <label for="title">Title:</label>
            <input id="title" name="title" #title>
        </div>

        <button (click)="findArticle(title)"
                class="ui positive right floated button">
            Find it!
        </button>
    </form>

    <div class="ui grid posts">
        <reddit-article
            *ngFor="let article of sortedArticles(title)"
            [article]="article"></reddit-article>
    </div>
    `
})

class RedditApp {
    articles: Article[];

    constructor(){
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 3),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 1),
        ];
    }

    addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
        if (title.value === '' || link.value === '') return;

        console.log(`Adding article title: ${title.value} and link: ${link.value}`);
        this.articles.push(new Article(title.value, link.value));
        title.value = '';
        link.value = '';
    }

    findArticle(title: HTMLInputElement): void {
        if (title.value === '') return;
    }

    sortedArticles(title: HTMLInputElement): Article[] {
        return this.articles
            .sort((a: Article, b: Article) => b.votes - a.votes)
            .filter(item => item.title.toLowerCase().indexOf(title.value.toLowerCase()) > -1);
    }
}

bootstrap(RedditApp);
