import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { AuthGuard }                        from './../shared/auth-guard.service';
import { ProfileComponent }                 from './profile.component';
import { ProfileHomeComponent }             from './profile-home.component';

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivateChild: [AuthGuard],
        children: [
              { path: 'home', component: ProfileHomeComponent },
              { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }