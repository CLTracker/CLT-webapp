import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpModule }               from '@angular/http';
import { AuthGuard }                from './../shared/auth-guard.service';
import { JoinRoutingModule }     from './join.routing';
import { JoinComponent }         from './join.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        JoinRoutingModule
    ],
    exports: [],
    declarations: [
        JoinComponent
    ],
    providers: [
        AuthGuard
    ]
})
export class JoinModule { }