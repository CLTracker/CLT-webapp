import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { JoinComponent }                 from './join.component';

const joinRoutes: Routes = [
    {
        path: '',
        component: JoinComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(joinRoutes)],
    exports: [RouterModule]
})
export class JoinRoutingModule { }