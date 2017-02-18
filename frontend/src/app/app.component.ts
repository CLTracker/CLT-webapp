import { Component, AfterViewInit } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.scss';

declare var $: any;

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/CLTracker';
  title: string = 'hello';
  data: string;

  constructor(private api: ApiService) {
    this.api.getData()
      .subscribe(
        res => {
          this.data = JSON.stringify(res);
        },
        error => {
          console.log('Error!', error);
        }
      );

    var	$window = $(window),
    $body = $('body');

    // Disable animations/transitions until the page has loaded.
    $body.addClass('is-loading');

    $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-loading');
    }, 100);
    });
  }

  ngAfterViewInit() {

  }
}
