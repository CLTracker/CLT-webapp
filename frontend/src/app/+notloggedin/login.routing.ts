import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { LoginComponent }                 from './login.component';

const notLoggedInRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(notLoggedInRoutes)],
    exports: [RouterModule]
})
export class notLoggedInRoutingModule { }