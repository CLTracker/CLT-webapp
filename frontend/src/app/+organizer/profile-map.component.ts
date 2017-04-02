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

    private imgUrl: string;

    constructor() {}

    ngOnInit() {
        this.uploader.onSuccessItem =
        (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            console.log(response);
        };
    }
}