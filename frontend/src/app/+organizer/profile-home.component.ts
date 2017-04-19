import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { FileUploader,
    FileItem,
    ParsedResponseHeaders }     from 'ng2-file-upload';

import { APP }                  from '../shared';
import { Auth }                 from '../shared';

@Component({
    selector: 'my-profile-home',
    templateUrl: './profile-home.component.html',
    styleUrls: ['./profile-home.component.scss']
})

export class ProfileHomeComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({url: APP.routes.PostImage});

    private conferenceName: string;
    private location: string;
    // clt-logo: http://i.imgur.com/E7W9wqm.png
    private imgUrl: string = '';

    constructor(private auth: Auth) {
        console.log(this.auth.userProfile);
    }

    ngOnInit() {
        this.uploader.onSuccessItem =
        (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            console.log(response);
            // imgUrl = response
        };
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