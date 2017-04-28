import { Component, ViewChild, 
    TemplateRef, OnInit }           from '@angular/core';
import { FileUploader, FileItem,
    ParsedResponseHeaders }         from 'ng2-file-upload';
import { Auth }                    from '../shared';
import { NgbModal,
    ModalDismissReasons }   from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'my-profile-news',
    templateUrl: './profile-news.component.html',
    styleUrls: ['./profile-news.component.scss']
})
export class ProfileNewsComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({url: this.auth.ImageUploadUrl});
    private news: any;

    private isEditItem: boolean = false;

    private errorLabel: string;
    private highlightTitle: boolean = false;
    private highlightText: boolean = false;
    private highlightAuthor: boolean = false;
    private highlightImage: boolean = false;

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
                console.log(result);
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
        // reset all input bindings to default text
        this.errorLabel = undefined;
        this.newsItemTitle = 'TITLE';
        this.newsItemText = 'place news text here';
        this.newsItemAuthor = 'AUTHOR';
        this.newsItemImg = undefined;

        this.isEditItem = false;

        // open modal and prompt user to fill information out
        this.modalService.open(this.modalContent)
            .result.then(
                (result) => {
                    console.log(result);
                }
            )
    }

    public editNewsPrompt(item: any): void {
        // set all bindings to current news item
        this.errorLabel = undefined;
        this.newsItemTitle = item.title;
        this.newsItemText = item.text;
        this.newsItemAuthor = item.author;
        this.newsItemImg = item.logo;

        this.isEditItem = true;

        // open modal and prompt user to fill information out
        this.modalService.open(this.modalContent)
            .result.then(
                (result) => {
                    console.log(result);
                }
            )
    }

    public deleteItem(item: any): void {

        let data: any = { 
            source: this.auth.userProfile.email, 
            news_item: { 
                title: item.title, 
                text: item.text, 
                logo: item.logo, 
                author: item.author
            }
        };

        this.auth.deleteNewsItem(data).subscribe(
            result => {
                this.news = result;
            },
            error => {
                console.log('error', error);
            }
        )
    }

    public submitNewsItem(close: any): void {
        this.highlightAuthor = this.highlightImage = this.highlightText = this.highlightTitle = false;
        if(this.newsItemTitle === '' || this.newsItemTitle === 'TITLE') {
            this.errorLabel = 'Missing title';
            this.highlightTitle = true;
            return;
        }
        if(this.newsItemText === '' || this.newsItemText === 'place news text here') {
            this.errorLabel = 'Missing body';
            this.highlightText = true;
            return;
        }
        if(this.newsItemAuthor === '' || this.newsItemAuthor === 'AUTHOR') {
            this.errorLabel = 'Missing author';
            this.highlightAuthor = true;
            return;
        }
        // if(this.newsItemImg === '') {
        //     this.errorLabel = 'Missing image';
        //     this.highlightImage = true;
        // }

        this.newsItemImg = '';

        let data: any = {
            source: this.auth.userProfile.email, 
            news_item: { 
                title: this.newsItemTitle, 
                text: this.newsItemText, 
                logo: this.newsItemImg, 
                author: this.newsItemAuthor 
            }
        };
        
        if (this.isEditItem) {
            this.auth.modifyNewsItem(data).subscribe(
                result => {
                    this.news = result;
                },
                error => {
                    console.log('error!', error);
                }
            )
        } else {
            this.auth.postNewsItem(data).subscribe(
                result => {
                    console.log(result);
                    this.news = result;
                },
                error => {
                    console.log('error!', error);
                }
            );
        }

        close();
    }

    
}