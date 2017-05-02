import { Component, OnInit }    from '@angular/core';
import { FileUploader,
    FileItem,
    ParsedResponseHeaders }     from 'ng2-file-upload';

import { Auth }                  from '../shared';

@Component({
    selector: 'my-profile-map',
    templateUrl: './profile-map.component.html',
    styleUrls: ['./profile-map.component.scss']
})

export class ProfileMapComponent implements OnInit{
    public uploader: FileUploader = new FileUploader({url: this.auth.ImageUploadUrl});

    // example: https://conferencecenter.ce.byu.edu/sites/conferencecenter.ce.byu.edu/files/map.png
    private imgUrl: string = 'https://conferencecenter.ce.byu.edu/sites/conferencecenter.ce.byu.edu/files/map.png';

    constructor(private auth: Auth) {}

    ngOnInit() {
        this.uploader.onSuccessItem =
        (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            let x = JSON.parse(response);
            this.imgUrl = x.link;
        };
    }

    public removeCurrImage(): void {
        this.imgUrl = '';

        // TODO: reflect this change on the server
    }
}