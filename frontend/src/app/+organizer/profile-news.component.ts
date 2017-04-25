import { Component, ViewChild, TemplateRef }        from '@angular/core';
import { Auth  }            from '../shared';

import { NgbModal,
    ModalDismissReasons }   from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'my-profile-news',
    templateUrl: './profile-news.component.html',
    styleUrls: ['./profile-news.component.scss']
})
export class ProfileNewsComponent {

    private news: Object;

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    constructor(private auth: Auth, private modalService: NgbModal) {
        // get current list of news from server
        this.auth.getNews().subscribe(
            result => {
                this.news = result;
            },
            error => {
                console.log(error);
            }
        )
    }

    public openNewsPrompt(): void {
        this.modalService.open(this.modalContent)
            .result.then(
                (result) => {
                    console.log(result);
                }
            )
    }

    
}