import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import {  FormControl }  from '@angular/forms';
import { Customer } from './customer.interface';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
@Component({
    
    selector: 'invoice',
    templateUrl: 'app/invoice.html'
  
})
export class InvoiceComponent implements OnInit {
  public myForm: FormGroup;
private products = [];
private product = {};
private sea={};
private seas=[];

private docs= [];

private options = new RequestOptions(
  { 
  headers: new Headers(
  { 
  'Content-Type': 'application/json',
   'charset': 'UTF-8' })
   });

    constructor(private _fb: FormBuilder,private http: Http) { }

    ngOnInit() {
        this.myForm = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
             email: ['', [Validators.required, Validators.minLength(2)]],
              invoiceNumber: ['', [Validators.required, Validators.minLength(1)]],
               totalCost: ['', [Validators.minLength(0)]],
             tax: ['', [Validators.minLength(2)]],
              grandTotal: ['', [Validators.minLength(2)]],
            products: this._fb.array([
                this.initProduct(),
            ])
        });
    this.loadProducts();
    }

    initProduct() {
        return this._fb.group({
            productName: ['', Validators.required],
            quantity: ['', Validators.required],
            cost:[''],
            total:['']
        });
    }

    addProduct(i) {
       const control = <FormArray>this.myForm.controls['products'];
        control.push(this.initProduct());

}

    removeProduct(i: number) {
        const control = <FormArray>this.myForm.controls['products'];
        control.removeAt(i);
    }

    save(model: Customer) {
     
        console.log(model);
   this.http.post("/doc", JSON.stringify(this.myForm.value), this.options).subscribe(
      res => {
        this.docs.push(res.json()); 
        },
      error => console.log(error)
    );       
    }


loadProducts(){
    this.http.get("/products").map(res => res.json()).subscribe(
      data => this.products = data,
      error => console.log(error)
    );
  }
 
 onBlurMethod(i){
  this.http.get("/productssss/"+this.myForm.value.products[i].productName).map(res => res.json()).subscribe(
      data =>{ this.seas = data;
    
       this.myForm.value.products[i].cost=this.seas.pcost;
        
        },
      error => console.log(error)
   );
}


BlurMethod(i){
  this.http.get("/productssss/"+this.myForm.value.products[i].productName).map(res => res.json()).subscribe(
      data =>{ this.seas = data;
    this.myForm.value.products[i].cost=this.seas.pcost;
       this.myForm.value.products[i].total=this.seas.pcost*this.myForm.value.products[i].quantity;
        
        },
      error => console.log(error)
   );

}

 getTotal(){
   var total = 0;
   for(var i = 0; i <this.myForm.value.products.length; i++){
        var product = this.myForm.value.products[i];
        total += (product.quantity * product.cost);
    this.myForm.value.totalCost=total;
 this.myForm.value.tax=10;
    this.myForm.value.grandTotal=this.myForm.value.totalCost+this.myForm.value.totalCost*(this.myForm.value.tax/100)
    }
    return total;
  } 

}