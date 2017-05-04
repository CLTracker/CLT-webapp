import { Injectable }       from '@angular/core';
import { tokenNotExpired }  from 'angular2-jwt';
import { Router }           from '@angular/router';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';

declare var Auth0Lock: any;
    
const prod: string = 'sproduction';

@Injectable()
export class Auth {

    public ImageUploadUrl: string;

    public UsersInfoUrl: string;
    public LoginUrl: string;
    public ConferenceInfoUrl: string;
    public ConferenceEditUrl: string;
    public ExhibitorsInfoUrl: string;
    public ExhibitorsUsersInfoUrl: string;
    public ExhibitorEditUrl: string;
    public NewsInfoUrl: string;
    public NewsEditUrl: string;
    public ScheduleInfoUrl: string;
    public ScheduleEditUrl: string;

    Lock = new Auth0Lock(
        'jyb8nxXVywA8ezS3Vin9CnEhkY3FH7fC',
        'clt-global.auth0.com',
        {
            theme: {
                logo: 'http://i.imgur.com/XDKwjRv.png',
                primaryColor: '#0F4c60'
            },
            languageDictionary: {
                title: 'CLTracker'
            },
        }
    );

    userProfile: any;
    authToken: any;

    constructor(private router: Router, private http: Http) {
        
        if (prod === 'production-test') {
            this.ImageUploadUrl = 'https://clt.website:5000/img';
            this.UsersInfoUrl = 'https://clt.website:5000/user';
            this.LoginUrl = 'https://clt.website:5000/login';
            this.ConferenceEditUrl = 'https://clt.website:5000/edit/conference/1';
            this.ConferenceInfoUrl = 'https://clt.website:5000/info/1';
            this.ExhibitorsInfoUrl = 'https://clt.website:5000/exhibitors/1';
            this.ExhibitorsUsersInfoUrl = 'https://clt.website:5000/user/exhibitors/1';
            this.ExhibitorEditUrl = 'https://clt.website:5000/edit/exhibitor/1';
            this.NewsInfoUrl = 'https://clt.website:5000/news/1';
            this.NewsEditUrl = 'https://clt.website:5000/edit/news/1';
            this.ScheduleInfoUrl = 'https://clt.website:5000/schedule/1';
            this.ScheduleEditUrl = 'https://clt.website:5000/edit/schedule/1';
        } else if (prod === 'production') {
            this.ImageUploadUrl = 'https://clt.website/img';
            this.UsersInfoUrl = 'https://clt.website/user';
            this.LoginUrl = 'https://clt.website/login';
            this.ConferenceEditUrl = 'https://clt.website/edit/conference/1';
            this.ConferenceInfoUrl = 'https://clt.website/info/1';
            this.ExhibitorsInfoUrl = 'https://clt.website/exhibitors/1';
            this.ExhibitorsUsersInfoUrl = 'https://clt.website/user/exhibitors/1';
            this.ExhibitorEditUrl = 'https://clt.website/edit/exhibitor/1';
            this.NewsInfoUrl = 'https://clt.website/news/1';
            this.NewsEditUrl = 'https://clt.website/edit/news/1';
            this.ScheduleInfoUrl = 'https://clt.website/schedule/1';
            this.ScheduleEditUrl = 'https://clt.website/edit/schedule/1';
        } else {
            this.ImageUploadUrl = 'http://localhost:5000/img';
            this.UsersInfoUrl = 'http://localhost:5000/user';
            this.LoginUrl = 'http://localhost:5000/login';
            this.ConferenceEditUrl = 'http://localhost:5000/edit/conference/1';
            this.ConferenceInfoUrl = 'http://localhost:5000/info/1';
            this.ExhibitorsInfoUrl = 'http://localhost:5000/exhibitors/1';
            this.ExhibitorsUsersInfoUrl = 'http://localhost:5000/user/exhibitors/1';
            this.ExhibitorEditUrl = 'http://localhost:5000/edit/exhibitor/1';
            this.NewsInfoUrl = 'http://localhost:5000/news/1';
            this.NewsEditUrl = 'http://localhost:5000/edit/news/1';
            this.ScheduleInfoUrl = 'http://localhost:5000/schedule/1';
            this.ScheduleEditUrl = 'http://localhost:5000/edit/schedule/1';
        }

        this.authToken = JSON.parse(localStorage.getItem('authToken'));
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
                localStorage.setItem('authToken', JSON.stringify(profile));
                let redirectUrl = JSON.parse(localStorage.getItem('redir'));
                this.router.navigate(redirectUrl);
            });
        });
    }

    public setProfile(profile: Object) {
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
    }

    public loginOrganizer() {
        localStorage.setItem('redir', JSON.stringify(['org', 'profile']));
        this.Lock.show();
    }

    public loginExhibitor() {
        localStorage.setItem('redir', JSON.stringify(['xhb', 'profile']));
        this.Lock.show();
    }

    public loginAdministrator() {
        localStorage.setItem('redir', JSON.stringify(['adm', 'profile']));
        this.Lock.show();
    }

    public refresh() {
        this.authToken = JSON.parse(localStorage.getItem('authToken'));
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }

    public getExhibitorUserInfo(email: string) {
        return this.http
            .get(`${this.ExhibitorsInfoUrl}/${email}`)
            .map((r: Response) => r.json());
    }

    public patchExhibitorInfo(data: any) {
        return this.http
            .patch(`${this.ExhibitorEditUrl}`, data)
            .map((r: Response) => r.json());
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
        localStorage.removeItem('authToken');
        localStorage.removeItem('redir');
        this.userProfile = undefined;
    }
}
