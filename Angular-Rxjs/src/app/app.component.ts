import { Component } from '@angular/core';
import { Observable, Subject, partition, combineLatestWith, forkJoin, concat, race } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-Rxjs';
  result: any = 'NAN';
  // showChild = true
  // // Partition
  // numbersSubject = new Subject<any>();
  // evenNumbers$: Observable<number>;
  // oddNumbers$: Observable<number>;

  // componentAList: number[] = [];
  // componentBList: number[] = [];

    // titleA = 'Even';
    // titleB = 'Odd';

  // constructor(){
  //   [this.evenNumbers$, this.oddNumbers$] = partition(this.numbersSubject, value => value % 2 === 0);

  //   this.evenNumbers$.subscribe(
  //     (res) => this.componentAList.push(res)
  //   )

  //   this.oddNumbers$.subscribe(
  //     res => this.componentBList.push(res)
  //   )

  // }

  // // Partition
  // onChange(event: HTMLInputElement): void{
  //   this.numbersSubject.next(event.value);
  //   event.value = '';
  // }



  // CombineLatestWith

  // titleA = '';
  // titleB = '';

  // // Subject
  // subject1 = new Subject<any>();
  // subject2 = new Subject<any>();


  // // Input List to the child component
  // componentAList: number[] = [];
  // componentBList: number[] = [];


  // constructor() {
  //   // CombineLatestwith operator
  //   this.subject1.pipe(
  //     combineLatestWith(this.subject2)
  //   ).subscribe(
  //     (res: any) => {
  //       debugger
  //       this.componentAList.push(res[0])
  //       this.componentBList.push(res[1])
  //     }
  //   )
  // }


  // onChange1(inpt: HTMLInputElement): void {
  //   this.subject1.next(inpt.value);
  // }

  // onChange2(inpt2: HTMLInputElement): void {
  //   this.subject2.next(inpt2.value);
  // }

  // forkJoin
    // titleA = '';
    // titleB = '';
  // showChild = false;
  // showCompletBtn = true;


  // isCompleted1 = false;
  // isCompleted2 = false;

  // // Subject
  // subject1 = new Subject<any>();
  // subject2 = new Subject<any>();
  // // subject3 = new Subject<any>();


  // // Input List to the child component
  // componentAList: any[] = [];
  // componentBList: any[] = [];

  // constructor() {
  //   forkJoin({
  //     sub1: this.subject1,
  //     sub2: this.subject2,
  //     // sub3: this.subject3
  //   }).subscribe(
  //     (res) => {
  //       this.result = '';
  //       console.log(res);
  //       for (const value of Object.values(res)) { 
  //         this.result += value + ' -- ' 
  //       }
  //     }
  //   )
  // }
 
  // onChange1(inpt: HTMLInputElement): void {
  //   this.subject1.next(inpt.value);
  //   if(!this.isCompleted1){
  //     this.componentAList.push(inpt.value);
  //   }
  //   inpt.value = '';
  // }

  // onChange2(inpt2: HTMLInputElement): void {
  //   this.subject2.next(inpt2.value);
  //   if(!this.isCompleted2){
  //     this.componentBList.push(inpt2.value);
  //   }
  //   inpt2.value = '';
  // }

  // onComplete1(): void {
  //   this.subject1.complete();
  //   this.isCompleted1 = true;
  // }
  // onComplete2(): void {
  //   this.subject2.complete();
  //   this.isCompleted2 = true;
  // }


  // concat
  // titleA = 'Observer 1';
  // titleB = 'Observer 2';
  // showChild = true;
  // showCompletBtn = true;
  // isCompleted = false;
  // allCompleted = false;


  // // Subject
  // subject1 = new Subject<any>();
  // subject2 = new Subject<any>();


  // // Input List to the child component
  // componentAList: any[] = [];
  // componentBList: any[] = [];

  // constructor() {
  //   concat(this.subject1,this.subject2)
  //   .subscribe(
  //     (res) => {
  //       if(!this.allCompleted){
  //         if(!this.isCompleted){
  //           this.componentAList.push(res);
  //         }
  //         else{
  //           this.componentBList.push(res);
  //         }
  //       }
  //     }
  //   )
  // }
 
  // onChange1(inpt: HTMLInputElement): void {
  //   this.subject1.next(inpt.value);
  //   // this.componentAList.push(inpt.value);
  //   inpt.value = '';
  // }

  // onChange2(inpt2: HTMLInputElement): void {
  //   this.subject2.next(inpt2.value);
  //   // this.componentBList.push(inpt2.value);
  //   inpt2.value = '';
  // }

  // onComplete1(): void {
  //   this.subject1.complete();
  //   this.isCompleted = true;
  // }
  // onComplete2(): void {
  //   this.subject2.complete();
  //   this.allCompleted = false;
  // }

  // race
  titleA = 'Observer 1';
  titleB = 'Observer 2';
  showChild = true;
  showCompletBtn = false;


  // Subject
  subject1 = new Subject<any>();
  subject2 = new Subject<any>();
  isCompA = false;
  isCompB = false;


  // Input List to the child component
  componentAList: any[] = [];
  componentBList: any[] = [];

  constructor() {
    race(this.subject1,this.subject2)
    .subscribe(
      (res) => {
        if(this.isCompA){
          this.componentAList.push(res);
        }
        else{
          this.componentBList.push(res);
        }
      }
    )
  }
 
  onChange1(inpt: HTMLInputElement): void {
    this.isCompA = true;
    this.subject1.next(inpt.value);
    // this.componentAList.push(inpt.value);
    inpt.value = '';
  }

  onChange2(inpt2: HTMLInputElement): void {
    this.isCompB = true;
    this.subject2.next(inpt2.value);
    // this.componentBList.push(inpt2.value);
    inpt2.value = '';
  }

  onComplete1(): void {
    this.subject1.complete();
  }
  onComplete2(): void {
    this.subject2.complete();
  }
}
