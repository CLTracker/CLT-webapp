import { NgModule }                     from '@angular/core';
import { MaterialModule }               from '@angular/material';
import { CommonModule }                 from '@angular/common';
import { HttpModule }                   from '@angular/http';
import { OrgRouteGuard }                from './../shared';
import { ProfileRoutingModule }         from './profile.routing';
import { ProfileComponent }             from './profile.component';
import { ProfileHomeComponent }         from './profile-home.component';
import { ProfileMapComponent }          from './profile-map.component';
import { ProfileExhibitorsComponent }   from './profile-exhibitors.component';
import { ProfileScheduleComponent }     from './profile-schedule.component';
import { ProfileNewsComponent }         from './profile-news.component';
import { ProfileNotifyComponent }       from './profile-notify.component';

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
        ProfileMapComponent,
        ProfileExhibitorsComponent,
        ProfileScheduleComponent,
        ProfileNewsComponent,
        ProfileNotifyComponent
    ],
    providers: [
        OrgRouteGuard
    ]
})
export class OrganizerProfileModule { }