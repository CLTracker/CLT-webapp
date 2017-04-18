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
            // (+) converts string 'id' to a number
            .subscribe((params: Params) => this.perm = params['portal']);
    }

    joinOrg(): void {
        console.log('join that org!');
        
        let postData = this.auth.authToken;
        postData.loginType = this.perm;

        console.log(this.auth.authToken);


        this.auth.postLogin(postData).subscribe(
            result => {
                console.log(result);
            }, error => {
                console.log('error!', error);
            }
        );
        // let headers: any = {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // };

        // let data: any = JSON.stringify({
        //     user_metadata: {
        //         organization: this.org,
        //         permissions: this.perm
        //     }
        // });

        // this.authHttp
        //     .patch('https://' + 'clt-global.auth0.com' + '/api/v2/users/' + this.auth.userProfile.user_id, data, {headers: headers})
        //     .map(response => response.json())
        //     .subscribe(
        //         response => {
        //             this.auth.userProfile = response;
        //             localStorage.setItem('profile', JSON.stringify(response));
        //             this.router.navigate([this.perm, 'profile']);
        //         },
        //         error => alert(error.json().message)
        //     );
    }
}