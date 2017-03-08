import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpModule }               from '@angular/http';
import { AuthGuard }                from './../shared';
import { ProfileRoutingModule }     from './profile.routing';
import { ProfileComponent }         from './profile.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ProfileRoutingModule
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class ProfileModule { }