import { Component, OnInit, ViewChild,
    TemplateRef }           from '@angular/core';
import { Router }           from '@angular/router';
import { FileUploader,
    FileItem,
    ParsedResponseHeaders } from 'ng2-file-upload';
import { NgbModal,
    ModalDismissReasons }   from '@ng-bootstrap/ng-bootstrap';
import { Auth }             from '../shared';
import { MdSnackBar }       from '@angular/material';

@Component({
    selector: 'my-profile-home',
    templateUrl: './profile-home.component.html',
    styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({url: this.auth.ImageUploadUrl, disableMultipart: true});
    
    private news: any = [];

    private company: string;
    private name: string;
    private bio: string;
    private imgUrl: string;

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

    constructor(private auth: Auth, private modalService: NgbModal, private snackBar: MdSnackBar) {
        console.log(this.auth.userProfile);
        this.auth.getExhibitorUserInfo(this.auth.userProfile.email).subscribe(
            result => {
                console.log(result);
                this.bio = result.bio;
                this.name = result.name;
                this.company = result.company;
                this.imgUrl = result.logo_url;
                this.auth.setProfile(result);
            },
            error => {
                console.log(error);
            }
        );

        this.auth.getNews().subscribe(
            result => {
                let tNews = result;
                for(let n of tNews) {
                    if(n.author === this.auth.userProfile.company) {
                        this.news.push(n);
                    }
                }
            },
            error => {
                console.log(error);
                alert('Error getting news information');
            }
        );
    }

    ngOnInit() {
        this.uploader.onSuccessItem = 
            (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
                let x = JSON.parse(response);
                this.imgUrl = x.link;
            }
    }

    public saveContent(): void {
        let data: any = {
            bio: this.bio,
            company: this.company,
            email: this.auth.userProfile.email,
            logo_url: this.imgUrl,
            name: this.name,
            permissions: this.auth.userProfile.permissions,
            userId: this.auth.userProfile.userId,
            userType: this.auth.userProfile.userType
        };

        this.auth.patchExhibitorInfo(data).subscribe(
            result => {
                this.auth.getExhibitorUserInfo(this.auth.userProfile.email).subscribe(
                    result => {
                        console.log(result);
                        this.auth.setProfile(result);
                        this.snackBar.open('Saved!','',{duration: 2000});
                    },
                    error => {
                        console.log(error);
                        alert('Error getting exhibitor info!');
                    }
                )
            }, error => {
                console.log(error);
                alert('Error patching exhibitor info!');
            }
        )
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
                (result) => { console.log(result); }
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
                (result) => { console.log(result); }
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
                this.news = [];
                let tNews = result;
                for(let n of tNews) {
                    if(n.author === this.auth.userProfile.company) {
                        this.news.push(n);
                    }
                }
            },
            error => {
                console.log(error);
                alert('Error deleting news item!');
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
        if(this.newsItemImg === '') {
            this.errorLabel = 'Missing image';
            this.highlightImage = true;
        }

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
                    this.news = [];
                    let tNews = result;
                    for(let n of tNews) {
                        if(n.author === this.auth.userProfile.company) {
                            this.news.push(n);
                        }
                    }
                },
                error => {
                    console.log(error);
                    alert('Error patching news item!');
                }
            )
        } else {
            this.auth.postNewsItem(data).subscribe(
                result => {
                    this.news = [];
                    let tNews = result;
                    for(let n of tNews) {
                        if(n.author === this.auth.userProfile.company) {
                            this.news.push(n);
                        }
                    }
                },
                error => {
                    console.log(error);
                    alert('Error posting news item!');
                }
            );
        }

        close();
    }
}