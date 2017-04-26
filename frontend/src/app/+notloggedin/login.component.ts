import { Component }        from '@angular/core';
import { Router } from '@angular/router';
import {Auth} from '../shared'

@Component({
    selector: 'my-not-logged-in-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    constructor(private auth: Auth) {
    }
}