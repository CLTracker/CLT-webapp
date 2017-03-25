import { Component }        from '@angular/core';
import { Router }           from '@angular/router';
import { AuthHttp }         from 'angular2-jwt';

@Component({
    selector: 'my-join-page',
    templateUrl: './join.component.html',
    styleUrls: ['./join.component.scss']
})

export class JoinComponent {
    private org: String = "";
    constructor(
        private authHttp: AuthHttp,
        private router: Router) { }

    joinOrg(): void {
        console.log('join that org!');
        // let headers: any = {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // };

        // let data: any = JSON.stringify({
        //     user_metadata: {
        //         organization: this.org
        //     }
        // });

        // this.authHttp
        //     .patch('https://' + 'clt-global.auth0.com' + '/api/v2/users/' + this.auth.userProfile.user_id, data, {headers: headers})
        //     .map(response => response.json())
        //     .subscribe(
        //         response => {
        //             this.auth.userProfile = response;
        //             localStorage.setItem('profile', JSON.stringify(response));
        //             this.router.navigate(['profile']);
        //         },
        //         error => alert(error.json().message)
        //     );
    }
}