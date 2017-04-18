import { NgModule }                     from '@angular/core';
import { MaterialModule }               from '@angular/material';
import { CommonModule }                 from '@angular/common';
import { HttpModule }                   from '@angular/http';
import { AdmRouteGuard }                from './../shared';
import { ProfileRoutingModule }         from './profile.routing';
import { ProfileComponent }             from './profile.component';
import { ProfileHomeComponent }         from './profile-home.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ProfileRoutingModule,
        MaterialModule
    ],
    exports: [],
    declarations: [
        ProfileComponent,
        ProfileHomeComponent
    ],
    providers: [
        AdmRouteGuard
    ]
})
export class AdminProfileModule { }