import { Injectable }       from '@angular/core';
import { tokenNotExpired }  from 'angular2-jwt';
import { Router }           from '@angular/router';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';

declare var Auth0Lock: any;

const prod: string = 'local';

@Injectable()
export class Auth {

    private userUrl: string;
    private loginUrl: string;
    private cnfEditUrl: string;
    private xhbUrl: string;
    private xhbUsersUrl: string;
    private addXhbUrl: string;
    private newsUrl: string;

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
        
        if (prod === 'production-test') {
            this.userUrl = 'http://localhost:5000/user';
            this.loginUrl = 'http://cltglobal.ddns.net:5000/login';
            this.cnfEditUrl = 'http://cltglobal.ddns.net:5000/edit/conference/1';
            this.xhbUrl = 'http://cltglobal.ddns.net:5000/exhibitors/1';
            this.xhbUsersUrl = 'http://cltglobal.ddns.net:5000/user/exhibitors/1';
            this.addXhbUrl = 'http://cltglobal.ddns.net:5000/edit/exhibitors/1';
            this.newsUrl = 'http://cltglobal.ddns.net:5000/news/1';
        } else if (prod === 'production') {
            this.userUrl = 'http://localhost:8080/user';
            this.loginUrl = 'http://cltglobal.ddns.net:8080/login';
            this.cnfEditUrl = 'http://cltglobal.ddns.net:8080/edit/conference/1';
            this.xhbUrl = 'http://cltglobal.ddns.net:8080/exhibitors/1';
            this.xhbUsersUrl = 'http://cltglobal.ddns.net:8080/user/exhibitors/1';
            this.addXhbUrl = 'http://cltglobal.ddns.net:8080/edit/exhibitors/1';
            this.newsUrl = 'http://cltglobal.ddns.net:8080/news/1';
        } else {
            this.userUrl = 'http://localhost:5000/user';
            this.loginUrl = 'http://localhost:5000/login';
            this.cnfEditUrl = 'http://localhost:5000/edit/conference/1';
            this.xhbUrl = 'http://localhost:5000/exhibitors/1';
            this.xhbUsersUrl = 'http://localhost:5000/user/exhibitors/1';
            this.addXhbUrl = 'http://localhost:5000/edit/exhibitors/1';
            this.newsUrl = 'http://localhost:5000/news/1';
        }

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
                let redirectUrl = JSON.parse(sessionStorage.getItem('redir'));
                this.router.navigate(redirectUrl);
            });
        });
    }

    public setProfile(profile: Object) {
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
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

    public addExhibitor(data: Object) {
        return this.http
            .post(`${this.addXhbUrl}`, data)
            .map((r: Response) => r.json());
    }

    public getExhibitors() {
        return this.http
            .get(`${this.xhbUsersUrl}`)
            .map((r: Response) => r.json());
    }

    public getNews() {
        return this.http
            .get(`${this.newsUrl}`)
            .map((r: Response) => r.json());
    }

    public patchConference(data: Object) {
        return this.http
            .patch(`${this.cnfEditUrl}`, data)
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