import { Injectable }       from '@angular/core';
import { tokenNotExpired }  from 'angular2-jwt';
import { Router }           from '@angular/router';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
    OrganizerLock = new Auth0Lock(
        'jyb8nxXVywA8ezS3Vin9CnEhkY3FH7fC', 
        'clt-global.auth0.com', 
        {
            auth: { redirectUrl: 'http://localhost:8080/org/profile' }
        }
    );
    ExhibitorLock = new Auth0Lock(
        'jyb8nxXVywA8ezS3Vin9CnEhkY3FH7fC', 
        'clt-global.auth0.com', 
        {
            //auth: { redirectUrl: 'http://localhost:8080/xhb/profile' }
        }
    );
    AdministratorLock = new Auth0Lock(
        'jyb8nxXVywA8ezS3Vin9CnEhkY3FH7fC', 
        'clt-global.auth0.com', 
        {
            auth: { redirectUrl: 'http://localhost:8080/adm/profile' }
        }
    );

    userProfile: any;

    constructor(private router: Router) {
        
        this.userProfile = JSON.parse(localStorage.getItem('profile'));

        // callback event for authenticated users
        this.OrganizerLock.on('authenticated', (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);

            this.OrganizerLock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    alert(error);
                    return;
                }

                profile.user_metadata = profile.user_metadata || {};
                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });
        });
        this.ExhibitorLock.on('authenticated', (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
            console.log('here!');
            this.OrganizerLock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    alert(error);
                    return;
                }
                console.log('also here!');
                profile.user_metadata = profile.user_metadata || {};
                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });
        });
        this.AdministratorLock.on('authenticated', (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);

            this.OrganizerLock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    alert(error);
                    return;
                }

                profile.user_metadata = profile.user_metadata || {};
                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });
        });
    }

    public loginOrganizer() {
        // display Auth0 Widget
        this.OrganizerLock.show();
    }

    public loginExhibitor() {
        // diplay Auth0 Widget
        this.ExhibitorLock.show();
    }

    public loginAdministrator() {
        // display Auth0 Widget
        this.AdministratorLock.show();
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