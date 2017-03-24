import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { AuthGuard }                        from './../shared/auth-guard.service';
import { ProfileComponent }                 from './profile.component';
import { ProfileHomeComponent }             from './profile-home.component';
import { ProfileLogoComponent }             from './profile-logo.component';
import { ProfileStaffComponent }            from './profile-staff.component';
import { ProfileEventsComponent }           from './profile-events.component';

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivateChild: [AuthGuard],
        children: [
              { path: 'basic', component: ProfileHomeComponent },
              { path: 'logo', component: ProfileLogoComponent },
              { path: 'staff', component: ProfileStaffComponent },
              { path: 'events' , component: ProfileEventsComponent },
              { path: '', redirectTo: 'basic', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }