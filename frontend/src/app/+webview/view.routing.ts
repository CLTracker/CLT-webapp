import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { HomeViewComponent }                from './home-view.component';
import { NewsViewComponent }                from './news-view.component';
import { ScheduleViewComponent }            from './schedule-view.component';
import { ExhibitorsViewComponent }           from './exhibitors-view.component';
import { MapViewComponent }                 from './map-view.component';

const viewRoutes: Routes = [
    {
        path: '',
        component: HomeViewComponent,
        children: [
            { path: 'news', component: NewsViewComponent },
            { path: 'schedule', component: ScheduleViewComponent },
            { path: 'exhibitors', component: ExhibitorsViewComponent },
            { path: 'map', component: MapViewComponent },
            { path: '', redirectTo: 'news', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(viewRoutes)],
    exports: [RouterModule]
})
export class ViewRoutingModule { }