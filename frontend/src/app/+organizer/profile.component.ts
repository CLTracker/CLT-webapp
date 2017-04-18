import { Component }        from '@angular/core';
import { Router, RouterLinkActive }           from '@angular/router';

import { Auth }             from '../shared';

@Component({
    selector: 'my-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
    constructor(private auth: Auth) {
        
    }
}