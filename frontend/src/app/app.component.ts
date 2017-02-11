import { Component } from '@angular/core';

import { ApiService } from './shared';

import '../style/app.scss';

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
  }
}
