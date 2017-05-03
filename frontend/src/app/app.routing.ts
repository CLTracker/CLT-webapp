import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  from './home/home.component';
import { AboutComponent } from './about/about.component';
import { IndustryComponent } from './industry/industry.component'
import { CurrentsolutionsComponent } from './currentsolutions/currentsolutions.component'

import { RouteGuard }      from './shared';

// TODO: implement these routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'org/profile', loadChildren: './+organizer/profile.module#OrganizerProfileModule' },
  { path: 'xhb/profile', loadChildren: './+exhibitor/profile.module#ExhibitorProfileModule' },
  { path: 'adm/profile', loadChildren:  './+administrator/profile.module#AdminProfileModule' },
  { path: 'notloggedin', loadChildren:  './+notloggedin/login.module#LoginModule' },
  { path: 'join/:portal', canActivate: [RouteGuard], loadChildren: './+join/join.module#JoinModule' },
  { path: 'about', component: AboutComponent },
  { path: 'industry', component: IndustryComponent },
  { path: 'currentsolutions', component: CurrentsolutionsComponent }
];

export const routing = RouterModule.forRoot(routes);
