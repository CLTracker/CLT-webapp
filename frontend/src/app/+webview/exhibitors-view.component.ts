import { Component }        from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';

import { ROUTES }           from './api-routes';

@Component({
    selector: 'my-exhibitors-view',
    templateUrl: './exhibitors-view.component.html',
    styleUrls: ['./exhibitors-view.component.scss']
})

export class ExhibitorsViewComponent {

    private exhibitors: any;

    constructor(private http: Http) {
        this.http.get(ROUTES.ExhibitorsInfoUrl)
            .map((r: Response) => r.json())
            .subscribe(
                result => {
                    this.exhibitors = result;
                },
                error => {
                    console.log('error retreiving news.....');
                }
            );
    }
}