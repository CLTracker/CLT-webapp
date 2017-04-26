import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute,
    Params }                        from '@angular/router';
import { Auth }                     from '../shared';

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
        private router: Router,
        private route: ActivatedRoute) { }

    /**
     * Looks into route parameters to see what portal the user attempted
     * to log into, and saves that information for proper redirection later
     * if the user is authorized. 
     */
    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => this.perm = params['portal']);
    }

    /**
     * When the 'Enter' button is clicked, this function will make a POST
     * request to the backend login route, and verify whether the user has
     * permissions to use the portal
     */
    joinOrg(): void {
        // get auth token which was set from user logging in
        let postData = this.auth.authToken;
        postData.loginType = this.perm;
        postData.conference = this.org;

        // send POST to server with login credentials, if successful
        // set profile to response and continue navigation forward
        this.auth.postLogin(postData).subscribe(
            result => {
                this.auth.setProfile(result);
                this.router.navigate([this.perm, 'profile']);
            }, error => {
                alert(error);
            }
        );
    }
}