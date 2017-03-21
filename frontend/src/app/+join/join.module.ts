import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpModule }               from '@angular/http';
import { MaterialModule }           from '@angular/material';
import { FormsModule }              from '@angular/forms';
import { JoinRoutingModule }     from './join.routing';
import { JoinComponent }         from './join.component';
import { AUTH_PROVIDERS }        from 'angular2-jwt';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        JoinRoutingModule,
        FormsModule,
        MaterialModule
    ],
    exports: [],
    declarations: [
        JoinComponent
    ],
    providers: [
        AUTH_PROVIDERS
    ]
})
export class JoinModule { }