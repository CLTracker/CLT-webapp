import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { AuthGuard }                        from './../shared/auth-guard.service';
import { ProfileComponent }                 from './profile.component';

const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivateChild: [AuthGuard],
        children: [
              { path: '', component: ProfileComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }