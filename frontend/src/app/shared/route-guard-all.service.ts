import { Injectable }       from '@angular/core';
import { 
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot}    from '@angular/router';
import { Auth }  from './auth.service';

@Injectable()
export class RouteGuard implements CanActivate {
    constructor(private router: Router, private auth: Auth) { } 

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // This function protects the 'join' router by checking to make sure that
        // if the user is at the join page, they actually belong there and should 
        // not be redirected

        let url: string = state.url;

        console.log('url: ' + url);
        if(!this.auth.authenticated()) {
            // redirect away from /join and into /notloggedin
            this.router.navigate(['/notloggedin']);
            return false;
        }

        // otherwise, user is authenticated so let them through
        return true;
    }
}