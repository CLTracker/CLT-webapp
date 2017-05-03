import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { XhbRouteGuard }                    from './../shared';
import { ProfileComponent }                 from './profile.component';
import { ProfileHomeComponent }             from './profile-home.component';

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivateChild: [XhbRouteGuard],
        children: [
              { path: 'basic', component: ProfileHomeComponent },
              { path: '', redirectTo: 'basic', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }