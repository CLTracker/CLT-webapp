import { Injectable }       from '@angular/core';
import { tokenNotExpired }  from 'angular2-jwt';
import { Router }           from '@angular/router';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';

declare var Auth0Lock: any;

@Injectable()
export class Auth {

    private getUserUrl: string = 'http://localhost:5000/user';
    private loginUrl: string  = 'http://localhost:5000/login';

    Lock = new Auth0Lock(
        'jyb8nxXVywA8ezS3Vin9CnEhkY3FH7fC', 
        'clt-global.auth0.com', 
        {  
            theme: {
                logo: 'http://i.imgur.com/XDKwjRv.png',
                primaryColor: '#0F4c60'
            },
            languageDictionary: {
                title: "CLTracker"
            },
        }
    );

    userProfile: any;
    authToken: any;

    constructor(private router: Router, private http: Http) {
        
        this.authToken = JSON.parse(sessionStorage.getItem('authToken'));
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        // callback event for authenticated users
        this.Lock.on('authenticated', (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
            this.Lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    alert(error);
                    return;
                }

                this.authToken = profile;
                sessionStorage.setItem('authToken', JSON.stringify(profile));
                // profile.user_metadata = profile.user_metadata || {};
                // localStorage.setItem('profile', JSON.stringify(profile));
                // this.userProfile = profile;

                let redirectUrl = JSON.parse(sessionStorage.getItem('redir'));
                this.router.navigate(redirectUrl);
            });
        });
    }

    public loginOrganizer() {
        sessionStorage.setItem('redir', JSON.stringify(['org', 'profile']));
        this.Lock.show();
    }

    public loginExhibitor() {
        sessionStorage.setItem('redir', JSON.stringify(['xhb', 'profile']));
        this.Lock.show();
    }

    public loginAdministrator() {
        sessionStorage.setItem('redir', JSON.stringify(['adm', 'profile']));
        this.Lock.show();
    }

    public refresh() {
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }

    public get(): Observable<Object> {
        return this.http
            .get(`${this.getUserUrl}/7`)
            .map((r: Response) => r.json());
    }

    public postLogin(data: any) {
        return this.http
            .post(`${this.loginUrl}`, data)
            .map((r: Response) => r.json());
    }

    public authenticated() {
        // check if JWT is expired
        return tokenNotExpired();
    }

    public logout() {
        // removes id token from storage so user is no longer authenticated
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
    }
}