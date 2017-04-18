import { Injectable }       from '@angular/core';
import { 
    CanActivateChild, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot}    from '@angular/router';
import { Auth }  from './auth.service';

@Injectable()
export class OrgRouteGuard implements CanActivateChild {
    constructor(private auth: Auth,
        private router: Router) { } 

    private hasOrg(): boolean { 
        return this.auth.userProfile && this.auth.userProfile.user_metadata &&
            this.auth.userProfile.user_metadata.organization
    }

    private hasPermissions(): boolean {
        return this.auth.userProfile && this.auth.userProfile.user_metadata && 
            this.auth.userProfile.user_metadata.permissions
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // TODO: change from Auth0 database to our own database

        this.auth.refresh();

        let url: Array<string> = state.url.split('/');

        // if user is no longer signed in
        if(!this.auth.authenticated()) {
            this.router.navigate(['/notloggedin']);
            return false;
        }

        // if the user doesn't have an organization yet, redirect them
        if(!this.hasOrg()) {
            this.router.navigate(['/join', url[1]]);
            return false;
        }

        // if the user has permissions but they aren't as an exhibitor, do not allow
        if(this.hasPermissions() && this.auth.userProfile.user_metadata.permissions !== 'org') {
            this.router.navigate(['']);
            return false;
        }

        // otherwise, user has is logged in and has an organization, so we let them through
        return true;
    }
}