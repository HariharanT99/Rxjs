import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Angular-Rxjs';

  constructor() {  
  }
}
