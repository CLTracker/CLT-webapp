import { Component }        from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Auth }             from '../shared';

import { ROUTES }           from './api-routes';

@Component({
    selector: 'my-news-view',
    templateUrl: './news-view.component.html',
    styleUrls: ['./news-view.component.scss']
})

export class NewsViewComponent {

    private news: any;

    constructor(private http: Http) {
        console.log('hello');
        this.http.get(ROUTES.NewsInfoUrl)
            .map((r: Response) => r.json())
            .subscribe(
                result => {
                    this.news = result;
                },
                error => {
                    console.log('error retreiving news.....');
                }
            )
    }
}