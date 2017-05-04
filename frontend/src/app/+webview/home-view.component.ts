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
    }
}