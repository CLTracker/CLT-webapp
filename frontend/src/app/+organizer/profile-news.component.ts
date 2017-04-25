import { Component, ViewChild, 
    TemplateRef, OnInit }           from '@angular/core';
import { FileUploader, FileItem,
    ParsedResponseHeaders }         from 'ng2-file-upload';
import { Auth, APP }                    from '../shared';
import { NgbModal,
    ModalDismissReasons }   from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'my-profile-news',
    templateUrl: './profile-news.component.html',
    styleUrls: ['./profile-news.component.scss']
})
export class ProfileNewsComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({url: APP.routes.PostImage});
    private news: Object;

    private newsItemTitle: string = 'TITLE';
    private newsItemText: string = 'place news text here';
    private newsItemAuthor: string = 'AUTHOR';
    private newsItemImg: string;

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

    ngOnInit() {
        this.uploader.onSuccessItem =
        (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            console.log(response);
            // newsItemImg = response;
        }
    }

    public openNewsPrompt(): void {
        this.modalService.open(this.modalContent)
            .result.then(
                (result) => {
                    console.log(result);
                }
            )
    }

    public submitNewsItem(close: any): void {

        close();
    }

    
}