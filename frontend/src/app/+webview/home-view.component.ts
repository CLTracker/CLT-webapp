import { Component }        from '@angular/core';
import { Router, RouterState }           from '@angular/router';

@Component({
    selector: 'my-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss']
})

export class HomeViewComponent {
    private currentView: string;
    private currentRoute: string;

    constructor(private router: Router) {
        console.log(this.router.routerState)
    }

    navigate(nav: any, route: string) {
        this.currentRoute = route;
        switch(route) {
            case 'news':
                this.currentView = 'News';
            break;
            case 'schedule':
                this.currentView = 'Schedule';
            break;
            case 'map':
                this.currentView = 'Convention Map';
            break;
            case 'exhibitors':
                this.currentView = 'Exhibitors'
            break;
        }
        nav.close();
        this.router.navigate([route]);
    }
}