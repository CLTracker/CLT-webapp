webpackJsonp([2],{395:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(4),i=e(121),d=e(18),r=e(19),l=e(29),a=e(605),c=e(521),u=e(520),s=function(){function AdminProfileModule(){}return AdminProfileModule}();s=__decorate([o.NgModule({imports:[d.CommonModule,r.HttpModule,a.ProfileRoutingModule,i.MaterialModule],exports:[],declarations:[c.ProfileComponent,u.ProfileHomeComponent],providers:[l.AdmRouteGuard]})],s),t.AdminProfileModule=s},520:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(4),i=function(){function ProfileHomeComponent(){}return ProfileHomeComponent}();i=__decorate([o.Component({selector:"my-profile-home",template:e(718),styles:[e(702)]}),__metadata("design:paramtypes",[])],i),t.ProfileHomeComponent=i},521:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(4),i=function(){function ProfileComponent(){}return ProfileComponent}();i=__decorate([o.Component({selector:"my-profile",template:e(719),styles:[e(703)]}),__metadata("design:paramtypes",[])],i),t.ProfileComponent=i},605:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(4),i=e(11),d=e(29),r=e(521),l=e(520),a=[{path:"",component:r.ProfileComponent,canActivateChild:[d.AdmRouteGuard],children:[{path:"basic",component:l.ProfileHomeComponent},{path:"",redirectTo:"basic",pathMatch:"full"}]}],c=function(){function ProfileRoutingModule(){}return ProfileRoutingModule}();c=__decorate([o.NgModule({imports:[i.RouterModule.forChild(a)],exports:[i.RouterModule]})],c),t.ProfileRoutingModule=c},702:function(n,t){n.exports=".fill-height {\n  height: 100%;\n  background-color: white; }\n\n.profile-banner-bg {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 60px;\n  background-color: #CCCCCC;\n  width: 100%; }\n\n.banner-text h3 {\n  line-height: 60px;\n  color: black;\n  text-align: center; }\n\nmd-grid-list {\n  margin-top: 70px;\n  height: calc(100% - 80px); }\n\nmd-grid-tile p {\n  color: black; }\n\nmd-grid-tile .padded {\n  padding: 10px;\n  width: 100%;\n  height: 100%; }\n\nmd-grid-tile md-card {\n  width: 100%;\n  height: 100%;\n  background-color: #fff; }\n"},703:function(n,t){n.exports="h1 {\n  line-height: 70px;\n  margin: 0;\n  cursor: pointer; }\n\nbutton {\n  /* override material style of color: #fff */\n  color: black !important; }\n\n#profile-wrapper {\n  position: absolute;\n  top: 70px;\n  left: 0;\n  background: _palette(bg);\n  height: 100%;\n  width: 100%;\n  z-index: 10; }\n\n.overlay-header {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 2; }\n\nmd-card {\n  height: 100%;\n  padding: 0; }\n\n.content-view {\n  height: 100%;\n  padding-bottom: 50px;\n  padding-top: 25px;\n  background-color: #E5E5E5; }\n  .content-view .container-fluid {\n    height: 100%; }\n\n#nav {\n  height: 100%; }\n  #nav .nav-content {\n    min-height: 100%;\n    background-color: white; }\n    #nav .nav-content button {\n      width: 100%;\n      border-bottom: 1px solid grey; }\n\n#primary {\n  height: 100%; }\n\n/* angular2 directive to make css property extend beyond scope */\n/deep/ #header {\n  position: relative !important;\n  top: 5px;\n  left: 0;\n  z-index: 1; }\n"},718:function(n,t){n.exports='<div class="container-fluid fill-height">\n    <div class="profile-banner-bg"></div>\n    <div class="col-md-12 banner-text">\n        <h3> Basic Settings - [Conference] </h3>\n    </div>\n    <md-grid-list cols="2" rowHeight="fit">\n        <md-grid-tile colspan="2">\n            <div class="padded">\n                <md-card>\n                    <p>Edit some settings</p>\n                </md-card>\n            </div>\n        </md-grid-tile>\n        <md-grid-tile>\n            <div class="padded">\n                <md-card>\n                    <p>more settings</p>\n                </md-card>\n            </div>\n        </md-grid-tile>\n        <md-grid-tile>\n            <div class="padded">\n                <md-card>\n                    <p>stuuuuuf</p>\n                </md-card>\n            </div>\n        </md-grid-tile>\n    </md-grid-list>\n</div>'},719:function(n,t){n.exports='<div class="overlay-header">\n    <div class="container-fluid">\n        <h1 [routerLink]="\'\'">\n            Convention Logistics Tracker\n        </h1>\n    </div>\n</div>\n<div id="profile-wrapper">\n    <div class="content-view">\n        <div class="container-fluid">\n            <div class="col-md-3" id="nav">\n                <md-card>\n                    <div class="nav-content">\n                        <button md-button [routerLink]="\'basic\'">\n                            Basic Settings\n                        </button>\n                        <button md-button [routerLink]="\'map\'">\n                            Floor Plan\n                        </button>\n                        <button md-button [routerLink]="\'exhibitors\'">\n                            Exhibitors\n                        </button>\n                        <button md-button [routerLink]="\'schedule\'">\n                            Schedule\n                        </button>\n                        <button md-button [routerLink]="\'news\'">\n                            News\n                        </button>\n                        <button md-button [routerLink]="\'notify\'">\n                            Push Notifications\n                        </button>\n                        <button md-button [routerLink]="\'billing\'">\n                            Billing\n                        </button>\n                    </div>\n                </md-card>\n            </div>\n            \n            <div class="col-md-9" id="primary">\n                <md-card>\n                    <router-outlet></router-outlet>\n                </md-card>\n            </div>\n            \n        </div>\n    </div>\n</div>'}});
//# sourceMappingURL=2.521de9d80b797ef7ea16.chunk.js.map