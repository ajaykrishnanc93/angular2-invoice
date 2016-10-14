import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { Validators } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import {  FormControl }  from '@angular/forms';
import { Customer } from './customer.interface';

@Component({
	selector: 'invoiceList',
	templateUrl: 'app/invoiceList.html',

})

export class InvoiceListComponent implements OnInit {

private products = [];

private seas=[];
private docs=[];
invoice={};
private invoices = [];
private options = new RequestOptions(
	{ 
	headers: new Headers(
	{ 
	'Content-Type': 'application/json',
	 'charset': 'UTF-8' })
	 });
 
private isEditing = false;

private addProductForm: FormGroup;
  private productName = new FormControl("", Validators.required);;
  private quantity = new FormControl("", Validators.required);
  private cost = new FormControl("");
    private total = new FormControl("");

constructor(private http: Http,private formBuilder: FormBuilder) {
	}


 ngOnInit() {
this.loadInvoices();
this.loadProducts();
this.addProductForm = this.formBuilder.group({
      productName: this.productName,
      quantity: this.quantity,
      cost: this.cost,
        total:this.total
    });
}



	loadInvoices() {
		this.http.get("/docs").map(res => res.json()).subscribe(
			data => this.invoices = data,
			error => console.log(error)
		);
	}

submitRemove(invoice){
  var delOptions = new RequestOptions({
      body: '', 
      headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })}
    );
    if(window.confirm("Do you want to permanently delete this Invoice?")) {
      this.http.delete("/doc/"+invoice._id, delOptions).subscribe(
        res => {
          var pos = this.invoices.map((e) => { return e._id }).indexOf(invoice._id);
          this.invoices.splice(pos, 1);
          
        },
        error => console.log(error)
      );
    }
}


 enableEditing(invoice) {
		this.isEditing = true;
		this.invoice = invoice;
   }

loadProducts(){
    this.http.get("/products").map(res => res.json()).subscribe(
      data => this.products = data,
      error => console.log(error)
    );
  }
 
 onBlurMethod(i){
  this.http.get("/productssss/"+this.invoice.products[i].productName).map(res => res.json()).subscribe(
      data =>{ this.seas = data;
    
       this.invoice.products[i].cost=this.seas.pcost;
        },
      error => console.log(error)
   );
}


BlurMethod(i){
  this.http.get("/productssss/"+this.invoice.products[i].productName).map(res => res.json()).subscribe(
      data =>{ this.seas = data;
    this.invoice.products[i].cost=this.seas.pcost;
       this.invoice.products[i].total=this.seas.pcost*this.invoice.products[i].quantity;
        
        },
      error => console.log(error)
   );

}

 getTotal(){
   var total = 0;
   for(var i = 0; i <this.invoice.products.length; i++){
        var product = this.invoice.products[i];
        total += (product.quantity * product.cost);
    this.invoice.totalCost=total+this.addProductForm.value.total;
 this.invoice.tax=10;
    this.invoice.grandTotal=(this.invoice.totalCost+(this.invoice.totalCost*(this.invoice.tax/100)));
    }
    return total;
  } 

submitEdit(invoice) {
    
    this.invoice.products.push(this.addProductForm.value);
  this.addProductForm.reset()
     
     this.http.put("/doc/"+invoice._id, JSON.stringify(invoice), this.options).subscribe(
      res => {
        this.isEditing = false;
        this.invoice = invoice;
        },
      error => console.log(error)
    );
  
  }

removeProduct(product){
 let index = this.invoice.products.indexOf(product);
        return Promise.resolve(this.invoice.products)
            .then(this.invoice.products => this.invoice.products.splice(index, 1));
  
  var delOptions = new RequestOptions({
      body: '', 
      headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })}
    );
this.http.put("/docss/"+product._id, delOptions).subscribe(
        res => {
          var pos = this.invoice.products.map((e) => { return e._id }).indexOf(product._id);
          this.invoice.products.splice(pos, 1);

          },
        error => console.log(error)
      );
    }


submitAdd(addProductForm){
  this.invoice.products.push(addProductForm.value);
this.addProductForm.reset()
}


BlMethod(){
  this.http.get("/productssss/"+this.addProductForm.value.productName).map(res => res.json()).subscribe(
      data =>{ this.seas = data;
    this.addProductForm.value.cost=this.seas.pcost;
      this.addProductForm.value.total=this.seas.pcost*this.addProductForm.value.quantity;
        
        },
      error => console.log(error)
   );
}

onBlMethod(){
  this.http.get("/productssss/"+this.addProductForm.value.productName).map(res => res.json()).subscribe(
      data =>{ this.seas = data;
    
       this.addProductForm.value.cost=this.seas.pcost;
       this.invoice.totalCost=this.invoice.totalCost+this.addProductForm.value.total;
        this.invoice.grandTotal=this.invoice.totalCost+10/100*this.invoice.totalCost;
        },
      error => console.log(error)
   );

}


}
