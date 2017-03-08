import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { AuthGuard }                        from './../shared/auth-guard.service';
import { JoinComponent }                 from './join.component';

const joinRoutes: Routes = [
    {
        path: '',
        component: JoinComponent,
        canActivateChild: [AuthGuard],
        children: [
              { path: '', component: JoinComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(joinRoutes)],
    exports: [RouterModule]
})
export class JoinRoutingModule { }