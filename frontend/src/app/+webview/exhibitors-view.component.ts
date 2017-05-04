import { Component, ViewChild, TemplateRef }        from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { NgbModal }         from '@ng-bootstrap/ng-bootstrap';

import { ROUTES }           from './api-routes';

@Component({
    selector: 'my-exhibitors-view',
    templateUrl: './exhibitors-view.component.html',
    styleUrls: ['./exhibitors-view.component.scss']
})

export class ExhibitorsViewComponent {

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    private exhibitors: any;
    private isLoading = true;
    private selectedExhibitor: any;

    constructor(private http: Http, private modal: NgbModal) {
        this.http.get(ROUTES.ExhibitorsInfoUrl)
            .map((r: Response) => r.json())
            .subscribe(
                result => {
                    console.log(result);
                    this.exhibitors = result;
                    this.isLoading = false;
                },
                error => {
                    console.log('error retreiving news.....');
                }
            );
    }

    openView(item: any) {
        this.selectedExhibitor = item;
        this.modal.open(this.modalContent);
    }
}