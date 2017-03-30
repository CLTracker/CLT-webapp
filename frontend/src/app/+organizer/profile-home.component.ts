import { Component }        from '@angular/core';
import { Router }           from '@angular/router';

import { appConsts }        from '../shared';

@Component({
    selector: 'my-profile-home',
    templateUrl: './profile-home.component.html',
    styleUrls: ['./profile-home.component.scss']
})

export class ProfileHomeComponent {
    private conferenceName: string;
    private location: string;
    private imgUrl: string;

    constructor() {}

    /**
     * Saves all content under 'General Information' and synchronizes
     * with the database
     */
    public saveGeneralContent(): void {
        let data: any = {};
        if (this.conferenceName /* && && TODO: check if different from db */) {
            data.ConfName = this.conferenceName;
        }
        if (this.location /* && && TODO: check if different from db */) {
            data.Location = this.location;
        }
        if (this.imgUrl /* && TODO: check if different from db */) {
            data.ImgUrl = this.imgUrl;
        }

        // if any fields need to be updated, proceed
        if (data) {

        }
    }
}