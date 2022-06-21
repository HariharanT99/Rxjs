import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, take, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit, OnDestroy {
  constructor() {}

  messages: string[] = [];
  msgSubject$: Subject<string> = new Subject();
  notifierSubject$: Subject<void> = new Subject();
  unsubscribe$: Subscription = new Subscription();

  ngOnInit(): void {
    this.unsubscribe$ = this.msgSubject$
      .pipe(
        take(4),
        //includes boolean param
        takeWhile((x) => x != 'gislen'),
        takeUntil(this.notifierSubject$)
      )
      .subscribe((value: string) => {
        this.messages.push(value);
      });
  }

  onTake(value: string) {
    this.msgSubject$.next(value);
  }

  onTakeUntil() {
    this.notifierSubject$.next();
  }

  onTakeWhile(value: string) {
    this.msgSubject$.next(value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }
}
