import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute,
    Params }                        from '@angular/router';
import { Auth }                     from '../shared';
import { AuthHttp }                 from 'angular2-jwt';

@Component({
    selector: 'my-join-page',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss']
})

export class JoinComponent implements OnInit {
    private org: String = "";
    private perm: String = "";
    constructor(
        private auth: Auth,
        private authHttp: AuthHttp,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => this.perm = params['portal']);
    }

    joinOrg(): void {
        // get auth token which was set from user logging in
        let postData = this.auth.authToken;
        postData.loginType = this.perm;

        // send POST to server with login credentials, if successful
        // set profile to response and continue navigation forward
        this.auth.postLogin(postData).subscribe(
            result => {
                console.log(result);
                this.auth.setProfile(result);
                this.router.navigate([this.perm, 'profile']);
            }, error => {
                alert(error);
            }
        );
    }
}