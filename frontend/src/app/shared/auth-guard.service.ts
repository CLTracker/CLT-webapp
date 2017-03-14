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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // This function protects the given router by ensuring the user is signed in
        // and correctly authenticated. If not, the user will be redirected to a page
        // asking the user to sign in before proceeding.

        console.log('Checking...');

        // let url: string = state.url;
        // if(!this.auth.authenticated()) {
        //     // redirect away from /profile and into /notloggedin
        //     this.router.navigate(['notloggedin']);
        //     return false;
        // }

        // otherwise, user is authenticated so let them through
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // This function protects any CHILD routes of the route being accessed, this function
        // is only procd when the route is successfully activated, and a child route is requested.
        // We'll use this to redirect an authenticated user that does not have an organization yet.

        console.log('CChecking...');

        let url: string = state.url;

        // TODO: how will user data access work?
        // if(this.auth.authenticated() /* && ?? */) {
        //     this.router.navigate(['join']);
        //     return false;
        // }

        // otherwise, user has is logged in and has an organization, so we let them through
        return true;
    }
}