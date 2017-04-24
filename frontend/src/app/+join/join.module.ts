import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpModule }               from '@angular/http';
import { MaterialModule }           from '@angular/material';
import { FormsModule }              from '@angular/forms';
import { JoinRoutingModule }     from './join.routing';
import { JoinComponent }         from './join.component';

/**
 * Module for handling lazy loaded /join route, which deals with
 * first time logged in users.
 */
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
    ]
})
export class JoinModule { }