import { Component }        from '@angular/core';
import { Auth  }            from '../shared';

@Component({
    selector: 'my-profile-news',
    templateUrl: './profile-news.component.html',
    styleUrls: ['./profile-news.component.scss']
})
export class ProfileNewsComponent {

    private news: Object;

    constructor(private auth: Auth) {
        this.auth.getNews().subscribe(
            result => {
                console.log(result);
                this.news = result;
            },
            error => {
                console.log(error);
            }
        )
    }
}