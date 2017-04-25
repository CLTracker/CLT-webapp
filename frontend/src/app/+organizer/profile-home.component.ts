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
    public uploader: FileUploader = new FileUploader({url: this.auth.imgUrl});

    private conferenceName: string;
    private location: string;
    private imgUrl: string = '';

    private beginDate: string;
    private endDate: string;
    private beginTime: string;
    private endTime: string;

    constructor(private auth: Auth) {
        console.log(this.auth.userProfile);
    }

    ngOnInit() {
        this.uploader.onSuccessItem =
            (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
                console.log(response);
                // imgUrl = response
            };
        this.auth.getConferenceInfo().subscribe(
            result => {
                this.conferenceName = result.conference_name;
                this.location = result.location;
                this.beginDate = result.start_date;
                this.endDate = result.end_date;
            },
            error => {
                console.log(error);
            }
        )

    }

    /**
     * Saves all content under 'General Information' and synchronizes
     * with the database
     */
    public saveGeneralContent(): void {
        console.log(this.beginTime);
        // { source: unique_id, fields: { /* fields to replace */ } }
        let data: any = {source: this.auth.userProfile.email, fields: {}};
        if (this.conferenceName) {
            data.fields.conference_name = this.conferenceName;
        }
        if (this.location) {
            data.fields.Location = this.location;
        }
        if (this.imgUrl) {
            data.fields.ImgUrl = this.imgUrl;
        }

        console.log(data);
        // if any fields need to be updated, proceed
        if (data) {
            this.auth.patchConference(data).subscribe(
                result => {
                    console.log("works");
                }, 
                error => {
                    console.log("fucko");
                }
            )
        }
    }
}