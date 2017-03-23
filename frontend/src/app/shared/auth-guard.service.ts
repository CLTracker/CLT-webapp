import { Injectable }       from '@angular/core';
import { 
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, 
    CanActivateChild }      from '@angular/router';
import { Auth }             from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private auth: Auth, private router: Router) { } 

    private hasOrg(): boolean {
        return this.auth.userProfile.user_metadata && this.auth.userProfile.user_metadata.organization
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // This function protects the 'join' router by checking to make sure that
        // if the user is at the join page, they actually belong there and should 
        // not be redirected

        let url: string = state.url;

        console.log('url: ' + url);
        if(!this.auth.authenticated()) {
            console.log('not logged in!');
            // redirect away from /join and into /notloggedin
            this.router.navigate(['/notloggedin']);
            return false;
        }

        // otherwise, user is authenticated so let them through
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // This function protects any CHILD routes of the route being accessed, this function
        // is only procd when the route is successfully activated, and a child route is requested.
        // We'll use this to redirect an authenticated user that does not have an organization yet.

        let url: string = state.url;

        console.log('checking if we can enter profile...');
        // TODO: fix how user data is accessed here. We probably don't want to use Auth0 
        // data once we have a database connection setup with the backend
        if(this.auth.authenticated() && !this.hasOrg()) {
            console.log('no org... redirecting to join');
            this.router.navigate(['/join']);
            return false;
        }

        // otherwise, user has is logged in and has an organization, so we let them through
        return true;
    }
}