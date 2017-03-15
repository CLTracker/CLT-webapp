import { NgModule }                 from '@angular/core';
import { MaterialModule }           from '@angular/material';
import { CommonModule }             from '@angular/common';
import { HttpModule }               from '@angular/http';
import { AuthGuard }                from './../shared';
import { ProfileRoutingModule }     from './profile.routing';
import { ProfileComponent }         from './profile.component';
import { ProfileHomeComponent }     from './profile-home.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ProfileRoutingModule,
        MaterialModule.forRoot()
    ],
    exports: [],
    declarations: [
        ProfileComponent,
        ProfileHomeComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class ProfileModule { }