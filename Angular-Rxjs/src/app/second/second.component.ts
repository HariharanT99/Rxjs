import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeLast, of, tap } from 'rxjs';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss'],
})
export class SecondComponent implements OnInit, OnDestroy {
  messages: number[] = [];
  msgSubject$: Subject<string> = new Subject<string>();
  unsubscribe$: Subscription = new Subscription();

  ngOnInit(): void {
    this.unsubscribe$ = of(10, 20, 30, 40, 50, 60, 70, 80, 90, 100)
      .pipe(
        tap((data: number) => {
          console.log(data);
        }),
        takeLast(4),
        tap((data: number) => {
          console.log(data);
        })
      )
      .subscribe((value: number) => {
        this.messages.push(value);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}
