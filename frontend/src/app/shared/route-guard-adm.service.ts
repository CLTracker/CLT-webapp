import { Injectable }       from '@angular/core';
import { 
    CanActivateChild, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot}    from '@angular/router';
import { Auth }  from './auth.service';

@Injectable()
export class AdmRouteGuard implements CanActivateChild {
    constructor(private auth: Auth,
        private router: Router) { } 

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.auth.refresh();

        let url: string = state.url;
        return true;
    }
}