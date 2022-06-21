import { Component } from '@angular/core';
import { filter, from, delay, fromEvent, interval, map, mergeMap, Observable, of, pipe, retry, skip, skipLast, skipUntil, skipWhile, throwError, timer, concatMap, Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-Rxjs';

  ngOnInit() {
    this.getProductList();
    this.getCartList();
    this.GetUserList();
    this.retry();
  }

  productList: any[] = [];
  arr: any[] = [];
  name: string = '';
  countries: any[] = [];
  listOfPrices = from(this.arr);
  skipUntilOb$ = new Subject<void>();

  getProductList() {
    this.appService.GetProducts().subscribe((result: any) => {
      this.productList = result;
      this.arr = [];
      for (let i = 0; i < this.productList.length - 10; i++) {
        this.arr.push(this.productList[i].price);
      }
      console.log(this.arr);

      this.skipUntilOperation();
    })
  }

  getCartList() {
    this.appService.GetCarts().pipe().subscribe((result: any) => {
      //console.log(result);
    })
  }

  GetUserList() {
    this.appService.GetUserList().pipe().subscribe((result: any) => {
      //console.log(result);
    })
  }

  skip() {
    const listOfPrices = from(this.arr);
    listOfPrices.pipe(skip(5)).subscribe((value: any) => {
      console.log(value);
    })
  }

  skipLast() {
    const listOfPrices = from(this.arr);
    listOfPrices.pipe(skipLast(5)).subscribe((value: any) => {
      console.log(value);
    })
  }

  skipUntilOperation() {
    const emitAfterClick = from(this.arr).pipe(concatMap(item => of(item).pipe(delay(1000)))).pipe(skipUntil(this.skipUntilOb$));

    emitAfterClick.subscribe(x => {
      console.log(x)
    });

  }

  skipUntil() {
    this.skipUntilOb$.next();
  }


  skipWhile() {
    const listOfPrices = from(this.arr);
    listOfPrices.pipe(skipWhile(i => i !== 15.99)).subscribe((value: any) => {
      console.log(value);
    })
  }

  searchCapital() {
    this.appService
      .searchCountryByName(this.name)
      .subscribe((data: Country[]) => {
        console.log(data);
        this.countries = data;
      });
  }

  retry() {
    const source = interval(1000);
    const example = source.pipe(
      mergeMap(val => {
        if (val > 2) {
          return throwError('Error!');
        }
        return of(val);
      }),
      retry(2)
    );

    const subscribe = example.subscribe({
      next: val => console.log(val),
      error: val => console.log(`${val}: Retried 2 times then quit!`)
    });
  }

  stopExecuting(){
    this.skipUntilOb$.complete();
    this.skipUntilOb$.unsubscribe();
  }
}
