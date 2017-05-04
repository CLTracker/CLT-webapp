import { Component }        from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';

import { ROUTES }           from './api-routes';

@Component({
    selector: 'my-news-view',
    templateUrl: './news-view.component.html',
    styleUrls: ['./news-view.component.scss']
})

export class NewsViewComponent {

    private news: any;
    private isLoading = true;

    constructor(private http: Http) {
        console.log('hello');
        this.http.get(ROUTES.NewsInfoUrl)
            .map((r: Response) => r.json())
            .subscribe(
                result => {
                    this.news = result;
                    this.isLoading = false;
                },
                error => {
                    console.log('error retreiving news.....');
                }
            );
    }
}