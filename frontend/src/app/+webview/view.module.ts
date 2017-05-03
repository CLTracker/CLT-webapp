import { NgModule }             from '@angular/core';
import { MaterialModule }       from '@angular/material';
import { CommonModule }         from '@angular/common';
import { HttpModule }           from '@angular/http';
import { FormsModule }          from '@angular/forms';
import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule }       from 'angular-calendar';
import { CalendarUtilsModule }  from '../utils/module';
import { ViewRoutingModule }    from './view.routing';
import { HomeViewComponent }    from './home-view.component';
import { NewsViewComponent }                from './news-view.component';
import { ScheduleViewComponent }            from './schedule-view.component';
import { ExhibitorsViewComponent }           from './exhibitors-view.component';
import { MapViewComponent }                 from './map-view.component';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ViewRoutingModule,
        MaterialModule,
        FormsModule,
        CalendarUtilsModule,
        NgbModule.forRoot(),
        CalendarModule.forRoot()
    ],
    exports: [],
    declarations: [
        HomeViewComponent,
        NewsViewComponent,
        ScheduleViewComponent,
        ExhibitorsViewComponent,
        MapViewComponent
    ]
})
export class ViewModule { }