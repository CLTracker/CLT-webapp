import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { FileUploader,
    FileItem,
    ParsedResponseHeaders }     from 'ng2-file-upload';

import { Auth }                 from '../shared';

@Component({
    selector: 'my-profile-home',
    templateUrl: './profile-home.component.html',
    styleUrls: ['./profile-home.component.scss']
})

export class ProfileHomeComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({url: this.auth.ImageUploadUrl, disableMultipart: true});

    private conferenceName: string;
    private location: string;
    private imgUrl: string = '';

    private beginDate: string;
    private endDate: string;
    private beginTime: string;
    private endTime: string;

    constructor(private auth: Auth) {
    }

    ngOnInit() {
        this.uploader.onSuccessItem =
            (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
                let x = JSON.parse(response);
                this.imgUrl = x.link;
            };
        this.auth.getConferenceInfo().subscribe(
            result => {
                console.log(result);
                this.conferenceName = result.conference_name;
                this.location = result.location;
                this.beginDate = result.start_date;
                this.endDate = result.end_date;
                this.imgUrl = result.logo_url;
            },
            error => {
                console.log(error);
            }
        );

    }

    /**
     * Saves all content under 'General Information' and synchronizes
     * with the database
     */
    public saveGeneralContent(): void {
        // { source: unique_id, fields: { /* fields to replace */ } }
        let data: any = {source: this.auth.userProfile.email, fields: {}};
        if (this.conferenceName) {
            data.fields.conference_name = this.conferenceName;
        }
        if (this.location) {
            data.fields.location = this.location;
        }
        if (this.imgUrl) {
            data.fields.logo_url = this.imgUrl;
        }

        console.log(data);
        // if any fields need to be updated, proceed
        this.auth.patchConference(data).subscribe(
            result => {
                console.log(result);
                this.auth.getConferenceInfo().subscribe(
                    result => {
                        this.conferenceName = result.conference_name;
                        this.location = result.location;
                        this.beginDate = result.start_date;
                        this.endDate = result.end_date;
                        this.imgUrl = result.logo_url;
                    },
                    error => {
                        console.log(error);
                    }
                )
            }, 
            error => {
                console.log("fucko");
            }
        )
    }
}