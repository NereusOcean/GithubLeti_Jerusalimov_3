import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
     <h2> 
     <div class = "menu">
        <ul>
          <li><a href = "/brokers">Брокеры</a></li>
          <li><a href = "/stoks">Акции</a></li>
          <li><a href = "/setting">Настройка биржи</a></li>
        </ul>
      </div>
     </h2>
      
      <router-outlet></router-outlet>`,
  styleUrls: ['./css/app.component.css']
})
export class AppComponent {}
