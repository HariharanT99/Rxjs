import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { observable,Subscription,interval,of, from, zip } from 'rxjs';
import { debounceTime,debounce,distinct, distinctUntilChanged } from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-rxjs';
  delay = 500;

  obj0 = { id: 3, name: 'name 2' };
   obj1 = { id: 3, name: 'name 1' };
   obj2 = { id: 4, name: 'name 2' };
   obj3 = { id: 3, name: 'name 3' };
   vals = [this.obj1, this.obj2, this.obj3];


    Sourse1$ = of(1,3,5,2,7);
    Source2$ = of('a','bc','hi','greet','hello');



  mform: FormGroup = new FormGroup({
    name: new FormControl()
  });

  obs!:Subscription;

  ngOnInit() {

    /////////////////Debounce Time///////////////////

    // this.obs=this.mform.valueChanges
    //   .pipe(debounceTime(500))
    //   .subscribe(data => console.log("DebounceTime =>", data));


     ///////////////////Debounce/////////////////////

      // this.obs=this.mform.valueChanges
      // .pipe(debounce(() => interval(500)))
      // .subscribe(data => console.log("Debounce =>", data));

      


      ////////////////////coustomize the delay in debounce/////////////////////

      // this.obs = this.mform.valueChanges
      // .pipe(
      //   debounce(() => {
      //     this.delay = this.delay + 100;
      //     console.log(this.delay);
      //     return interval(this.delay);
      //   })
      // )
      // .subscribe(data => console.log(data));

      ///////////////////Distinct & DistinctUntillChanged////////////

      of(1,1,1,2,2,3,2,4,5,1,2,3,4,5)
      .pipe(distinctUntilChanged())
      .subscribe(console.log);
      // OUTPUT: 1,2,3,4,5
      // 1,2,3,2,4,5,1,2,3,4,5

      ///////////// Distinct with selector ///////////////

      // from(this.vals)
      // .pipe(distinct(e => e.id))
      // .subscribe(console.log);
    
    /*
    OUTPUT:
    {id: 3, name: "name 1"}
    {id: 4, name: "name 2"}
     */



    //////////DistinctUntillChanaged
    // of(1,1,1,2,2,3,2,4,5,1,2,3,4,5)
    // .pipe(distinctUntilChanged((prev,curr)=>{
    //   return curr === prev+1;
    // }))
    // .subscribe(console.log);


    //////// distinctUntillchange with obj //////////////

    // from(this.vals).pipe(distinctUntilChanged()).subscribe((data)=> console.log(data))



    ///////////// constamize check with distinct untill change /////////////

    // from(this.vals).pipe(distinctUntilChanged((prev,curr)=>{
    //   return curr.id === prev.id+1
    // })).subscribe((data)=> console.log(data))




    ////////////////with debounce


  //   this.obs=this.mform.valueChanges.pipe(
  //     debounceTime(1000),
  //     //map((event: any) => event.target.value),
  //     distinctUntilChanged()
  //  ).subscribe((value) => console.log(value));

    /////////////////////  Zip  //////////////


// zip(this.Sourse1$,this.Source2$).subscribe((data)=>{
//   console.log(data);
// })





// with optional parameter
// zip([this.Source2$,this.Sourse1$],(a,b)=>{
//   return b+'_'+a;
// }).subscribe((data)=>{
//   console.log(data);
// })



  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }

}
