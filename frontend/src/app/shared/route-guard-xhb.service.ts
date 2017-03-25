import { Injectable }       from '@angular/core';
import { 
    CanActivateChild, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot}    from '@angular/router';
import { Auth }  from './auth.service';

@Injectable()
export class XhbRouteGuard implements CanActivateChild {
    constructor(private auth: Auth,
        private router: Router) { } 

    private hasOrg(): boolean {
        return this.auth.userProfile.user_metadata &&
            this.auth.userProfile.user_metadata.organization
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.auth.refresh();

        let url: string = state.url;

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