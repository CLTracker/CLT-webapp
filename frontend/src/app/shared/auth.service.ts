import { Injectable }       from '@angular/core';
import { tokenNotExpired }  from 'angular2-jwt';
import { Router }           from '@angular/router';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';

declare var Auth0Lock: any;

const prod: string = 'tttproduction';

@Injectable()
export class Auth {

    public ImageUploadUrl: string;
    
    private UsersInfoUrl: string;
    private LoginUrl: string;
    private ConferenceInfoUrl: string;
    private ConferenceEditUrl: string;
    private ExhibitorsInfoUrl: string;
    private ExhibitorsUsersInfoUrl: string;
    private ExhibitorEditUrl: string;
    private NewsInfoUrl: string;
    private NewsEditUrl: string;
    private ScheduleInfoUrl: string;
    private ScheduleEditUrl: string;

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
            this.ImageUploadUrl = 'http://cltglobal.ddns.net:5000/img';
            this.UsersInfoUrl = 'http://cltglobal.ddns.net:5000/user';
            this.LoginUrl = 'http://cltglobal.ddns.net:5000/login';
            this.ConferenceEditUrl = 'http://cltglobal.ddns.net:5000/edit/conference/1';
            this.ConferenceInfoUrl = 'http://cltglobal.ddns.net:5000/info/1';
            this.ExhibitorsInfoUrl = 'http://cltglobal.ddns.net:5000/exhibitors/1';
            this.ExhibitorsUsersInfoUrl = 'http://cltglobal.ddns.net:5000/user/exhibitors/1';
            this.ExhibitorEditUrl = 'http://cltglobal.ddns.net:5000/edit/exhibitors/1';
            this.NewsInfoUrl = 'http://cltglobal.ddns.net:5000/news/1';
            this.NewsEditUrl = 'http://cltglobal.ddns.net:5000/edit/news/1';
            this.ScheduleInfoUrl ='http://cltglobal.ddns.net:5000/schedule/1';
            this.ScheduleEditUrl = 'http://cltglobal.ddns.net:5000/edit/schedule/1';
        } else if (prod === 'production') {
            this.ImageUploadUrl = 'http://cltglobal.ddns.net:8080/img';
            this.UsersInfoUrl = 'http://cltglobal.ddns.net:8080/user';
            this.LoginUrl = 'http://cltglobal.ddns.net:8080/login';
            this.ConferenceEditUrl = 'http://cltglobal.ddns.net:8080/edit/conference/1';
            this.ConferenceInfoUrl = 'http://cltglobal.ddns.net:8080/info/1';
            this.ExhibitorsInfoUrl = 'http://cltglobal.ddns.net:8080/exhibitors/1';
            this.ExhibitorsUsersInfoUrl = 'http://cltglobal.ddns.net:8080/user/exhibitors/1';
            this.ExhibitorEditUrl = 'http://cltglobal.ddns.net:8080/edit/exhibitors/1';
            this.NewsInfoUrl = 'http://cltglobal.ddns.net:8080/news/1';
            this.NewsEditUrl = 'http://cltglobal.ddns.net:8080/edit/news/1';
            this.ScheduleInfoUrl = 'http://cltglobal.ddns.net:8080/schedule/1';
            this.ScheduleEditUrl = 'http://cltglobal.ddns.net:8080/edit/schedule/1';
        } else {
            this.ImageUploadUrl = 'http://localhost:5000/img';
            this.UsersInfoUrl = 'http://localhost:5000/user';
            this.LoginUrl = 'http://localhost:5000/login';
            this.ConferenceEditUrl = 'http://localhost:5000/edit/conference/1';
            this.ConferenceInfoUrl = 'http://localhost:5000/info/1';
            this.ExhibitorsInfoUrl = 'http://localhost:5000/exhibitors/1';
            this.ExhibitorsUsersInfoUrl = 'http://localhost:5000/user/exhibitors/1';
            this.ExhibitorEditUrl = 'http://localhost:5000/edit/exhibitors/1';
            this.NewsInfoUrl = 'http://localhost:5000/news/1';
            this.NewsEditUrl = 'http://localhost:5000/edit/news/1';
            this.ScheduleInfoUrl = 'http://localhost:5000/schedule/1';
            this.ScheduleEditUrl = 'http://localhost:5000/edit/schedule/1';
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

    public getConferenceInfo() {
        return this.http
            .get(`${this.ConferenceInfoUrl}`)
            .map((r: Response) => r.json());
    }

    public addExhibitor(data: Object) {
        return this.http
            .post(`${this.ExhibitorEditUrl}`, data)
            .map((r: Response) => r.json());
    }

    public getExhibitors() {
        return this.http
            .get(`${this.ExhibitorsUsersInfoUrl}`)
            .map((r: Response) => r.json());
    }

    public getNews() {
        return this.http
            .get(`${this.NewsInfoUrl}`)
            .map((r: Response) => r.json());
    }

    public patchConference(data: Object) {
        return this.http
            .patch(`${this.ConferenceEditUrl}`, data)
            .map((r: Response) => r.json());
    }

    public postLogin(data: any) {
        return this.http
            .post(`${this.LoginUrl}`, data)
            .map((r: Response) => r.json());
    }

    public postNewsItem(data: any) {
        return this.http
            .post(`${this.NewsEditUrl}`, data)
            .map((r: Response) => r.json());
    }

    public deleteNewsItem(data: any) {
        return this.http
            .patch(`${this.NewsEditUrl}`, data)
            .map((r: Response) => r.json());
    }

    public modifyNewsItem(data: any) {
        return this.http
            .put(`${this.NewsEditUrl}`, data)
            .map((r: Response) => r.json());
    }

    public getScheduleEvents() {
        return this.http
            .get(`${this.ScheduleInfoUrl}`)
            .map((r: Response) => r.json());
    }

    public patchScheduleEvents(data: any) {
        return this.http
            .patch(`${this.ScheduleEditUrl}`, data)
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