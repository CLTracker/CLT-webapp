import { Component, OnInit }    from '@angular/core';
import { FileUploader,
    FileItem,
    ParsedResponseHeaders }     from 'ng2-file-upload';
import { MdSnackBar }           from '@angular/material';
import { Auth }                  from '../shared';

@Component({
    selector: 'my-profile-map',
    templateUrl: './profile-map.component.html',
    styleUrls: ['./profile-map.component.scss']
})

export class ProfileMapComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({url: this.auth.ImageUploadUrl, disableMultipart: true});

    // example: https://conferencecenter.ce.byu.edu/sites/conferencecenter.ce.byu.edu/files/map.png
    private imgUrl: string = 'https://conferencecenter.ce.byu.edu/sites/conferencecenter.ce.byu.edu/files/map.png';

    constructor(private auth: Auth, private snackBar: MdSnackBar) {}

    ngOnInit() {
        this.uploader.onSuccessItem =
        (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            let x = JSON.parse(response);
            this.imgUrl = x.link;
        };
    }

    submitFloorPlan() {
        let data: any = {source: this.auth.userProfile.email, fields: {}};
        data.fields.floor_plan = this.imgUrl;

        this.auth.patchConference(data).subscribe(
            result => {
                this.auth.getConferenceInfo().subscribe(
                    result => {
                        console.log(result);
                        this.imgUrl = result.floor_plan;
                        this.snackBar.open('Saved!','', {duration: 2000});
                    },
                    error => {
                        console.log(error);
                        alert('Error getting conference information!')
                    }
                )
            }, 
            error => {
                console.log(error);
                alert('Error patching conference data!')
            }
        );
    }
}