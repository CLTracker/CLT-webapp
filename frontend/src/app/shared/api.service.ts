import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private getUserUrl: string = 'http://0.0.0.0:5000/1/1';

  constructor(private http: Http) { }

  getData(): Observable<Object> {
    return this.http
      .get(this.getUserUrl)
      .map((r: Response) => r.json());
  }
}
