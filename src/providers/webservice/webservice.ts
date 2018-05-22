import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WebServiceProvider {

  constructor(
    public http: HttpClient) {
    
  }

  // callGetService(url: string) {
  //   return this.http.get(url)
  //     .map(response => response.json());
  // }

  callGetService(url: string): Observable<any> {
    return this.http.get(url)
      .map((response: Response) => response);
  }

  callPostService(url: string, data: any): Observable<any> {
    return this.http.post(url, data)
      .map((response: Response) => response);
  }

}
