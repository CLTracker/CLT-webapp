import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpModule }               from '@angular/http';
import { notLoggedInRoutingModule }     from './login.routing';
import { LoginComponent }         from './login.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        notLoggedInRoutingModule
    ],
    exports: [],
    declarations: [
        LoginComponent
    ],
    providers: [ ]
})
export class LoginModule { }