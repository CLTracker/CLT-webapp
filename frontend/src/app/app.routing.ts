import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  from './home/home.component';
import { AboutComponent } from './about/about.component';

import { AuthGuard }      from './shared';

// TODO: implement these routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'org/profile', loadChildren: './+organizer/profile.module#OrganizerProfileModule' },
  { path: 'xhb/profile', loadChildren: './+exhibitor/profile.module#ExhibitorProfileModule' },
  { path: 'adm/profile', loadChildren:  './+administrator/profile.module#AdminProfileModule' },
  { path: 'notloggedin', loadChildren:  './+notloggedin/login.module#LoginModule' },
  { path: 'join', canActivate: [AuthGuard], loadChildren: './+join/join.module#JoinModule' },
  { path: 'about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(routes);
