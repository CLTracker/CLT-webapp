import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private url: string = 'http://localhost:3030/api/getdata';

  constructor(private http: Http) { }

  getData(): Observable<Object> {
    return this.http
      .get(this.url)
      .map((r: Response) => r.json());
  }
}
