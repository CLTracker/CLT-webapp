import { Component, OnInit }    from '@angular/core';
import { FileUploader,
    FileItem,
    ParsedResponseHeaders }     from 'ng2-file-upload';

import { APP }                  from '../shared';

@Component({
    selector: 'my-profile-map',
    templateUrl: './profile-map.component.html',
    styleUrls: ['./profile-map.component.scss']
})

export class ProfileMapComponent implements OnInit{
    public uploader: FileUploader = new FileUploader({url: APP.routes.PostImage});

    // example: http://www.amaconferencecenter.org/images/atlanta-floor-map.png
    private imgUrl: string = 'http://www.amaconferencecenter.org/images/atlanta-floor-map.png';

    constructor() {}

    ngOnInit() {
        this.uploader.onSuccessItem =
        (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            console.log(response);
            // imgUrl = response
        };
    }

    public removeCurrImage(): void {
        this.imgUrl = '';

        // TODO: reflect this change on the server
    }
}