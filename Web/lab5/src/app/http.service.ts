import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  get_brokers() {
    return this.http.get('http://localhost:4201/brokers');
  }

  get_stoks() {
    return this.http.get('http://localhost:4201/stoks');
  }

  get_settings() {
    return this.http.get('http://localhost:4201/setting');
  }

  set_brokers(date: any) {
    const body = date;
    console.log(body);
    return this.http.post('http://localhost:4201/brokers', body);
  }

  set_stoks(date: any) {
    const body = date;
    console.log(body);
    return this.http.post('http://localhost:4201/stoks', body);
  }

  set_setting(date: any) {
    const body = date;
    console.log(body);
    return this.http.post('http://localhost:4201/setting', body);
  }

}
