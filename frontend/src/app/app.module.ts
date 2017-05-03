import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NgbModule }      from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';

import { AppComponent }   from './app.component';
import { HomeComponent }  from './home/home.component';
import { AboutComponent } from './about/about.component';
import { IndustryComponent } from './industry/industry.component';
import { CurrentsolutionsComponent } from './currentsolutions/currentsolutions.component'
import { Auth }               from './shared';
import { routing }        from './app.routing';
import { RouteGuard }      from './shared';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    IndustryComponent,
    CurrentsolutionsComponent
  ],
  providers: [
    RouteGuard,
    Auth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
