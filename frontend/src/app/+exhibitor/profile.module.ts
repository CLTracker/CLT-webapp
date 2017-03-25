import { NgModule }                     from '@angular/core';
import { MaterialModule }               from '@angular/material';
import { CommonModule }                 from '@angular/common';
import { HttpModule }                   from '@angular/http';
import { XhbRouteGuard }                    from './../shared';
import { ProfileRoutingModule }         from './profile.routing';
import { ProfileComponent }                 from './profile.component';
import { ProfileHomeComponent }             from './profile-home.component';
import { ProfileLogoComponent }             from './profile-logo.component';
import { ProfileStaffComponent }            from './profile-staff.component';
import { ProfileEventsComponent }           from './profile-events.component';

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
        ProfileHomeComponent,
        ProfileLogoComponent,
        ProfileStaffComponent,
        ProfileEventsComponent
    ],
    providers: [
        XhbRouteGuard
    ]
})
export class ExhibitorProfileModule { }