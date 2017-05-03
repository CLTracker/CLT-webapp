import { NgModule }                     from '@angular/core';
import { MaterialModule }               from '@angular/material';
import { CommonModule }                 from '@angular/common';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { XhbRouteGuard }                    from './../shared';
import { ProfileRoutingModule }         from './profile.routing';
import { ProfileComponent }                 from './profile.component';
import { ProfileHomeComponent }             from './profile-home.component';
import { FileUploadModule }             from 'ng2-file-upload';
import { NgbModule }                    from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ProfileRoutingModule,
        MaterialModule,
        NgbModule.forRoot(),
        FileUploadModule
    ],
    exports: [],
    declarations: [
        ProfileComponent,
        ProfileHomeComponent
    ],
    providers: [
        XhbRouteGuard
    ]
})
export class ExhibitorProfileModule { }