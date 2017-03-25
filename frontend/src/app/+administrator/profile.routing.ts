import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { AdmRouteGuard }                    from './../shared';
import { ProfileComponent }                 from './profile.component';
import { ProfileHomeComponent }             from './profile-home.component';
import { ProfileMapComponent }              from './profile-map.component';
import { ProfileExhibitorsComponent }       from './profile-exhibitors.component';
import { ProfileScheduleComponent }         from './profile-schedule.component';
import { ProfileNewsComponent }             from './profile-news.component';
import { ProfileNotifyComponent }           from './profile-notify.component';

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivateChild: [AdmRouteGuard],
        children: [
              { path: 'basic', component: ProfileHomeComponent },
              { path: 'map', component: ProfileMapComponent },
              { path: 'exhibitors', component: ProfileExhibitorsComponent },
              { path: 'schedule' , component: ProfileScheduleComponent },
              { path: 'news', component: ProfileNewsComponent },
              { path: 'notify', component: ProfileNotifyComponent },
              { path: '', redirectTo: 'basic', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }