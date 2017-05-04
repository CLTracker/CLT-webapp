import { Component }        from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { ROUTES }           from './api-routes';

declare var $: any;

@Component({
    selector: 'my-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss']
})

export class MapViewComponent {
    private imgUrl: string;
    private isLoading = true;

    constructor(private http: Http) {
        this.http.get(ROUTES.ConferenceInfoUrl)
            .map((r: Response) => r.json())
            .subscribe(
                result => {
                    console.log(result);
                    this.imgUrl = result.floor_plan;
                    this.isLoading = false;
                },
                error => {
                    console.log('error retreiving map...', error);
                }
            );
        let windowHeight = $(window).innerHeight();
        console.log(windowHeight);
        $('md-sidenav-container').css('height', windowHeight);
    }
}