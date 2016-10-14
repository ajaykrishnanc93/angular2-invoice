import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import 'rxjs/Rx';


@Component({
	selector: 'customer',
	templateUrl: 'app/customers.html',
 
 
})

export class CustomersComponent implements  OnInit {

  
	private customers = [];
	private options = new RequestOptions(
	{ 
	headers: new Headers(
	{ 
	'Content-Type': 'application/json',
	 'charset': 'UTF-8' })
	 });

	private isEditing = false;
	private isSearching = false;
	private isAdding = false;
	private customer = {};

	
	private addCustomerForm: FormGroup;
	private cname = new FormControl("", Validators.required);
	private cplace = new FormControl("", Validators.required);
	private cphone = new FormControl("", Validators.required);
    private cemail = new FormControl("", Validators.required);
	constructor(private http: Http, private formBuilder: FormBuilder) {}

  ngOnInit() {
		this.addCustomerForm = this.formBuilder.group({
			cname: this.cname,
			cplace: this.cplace,
			cphone: this.cphone,
		    cemail:this.cemail
		});

		this.loadCustomers();
	}

	loadCustomers() {
		this.http.get("/customers").map(res => res.json()).subscribe(
			data => this.customers = data,
			error => console.log(error)
		);
	}

	
	 
	 enableEditing(customer) {
		this.isEditing = true;
		this.customer = customer;
	}


	
	cancelEditing() {
		this.isEditing = false;
		this.customer = {};
		
		this.loadCustomers();
	}

	
	enableSearching(name){
		this.isSearching = true;
		this.http.get("/customers/"+name).map(res => res.json()).subscribe(
			data => this.customers = data,
			error => console.log(error)
		);
	}
	
	
	
	
	submitEdit(customer) {
		this.http.put("/customer/"+customer._id, JSON.stringify(customer), this.options).subscribe(
			res => {
				this.isEditing = false;
				this.customer = customer;
				},
			error => console.log(error)
		);
	
	}

    submitRemove(customer) {
		var delOptions = new RequestOptions({
			body: '', 
			headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })}
		);
		if(window.confirm("Do you want to permanently delete this customer?")) {
			this.http.delete("/customer/"+customer._id, delOptions).subscribe(
				res => {
					var pos = this.customers.map((e) => { return e._id }).indexOf(customer._id);
					this.customers.splice(pos, 1);
					
				},
				error => console.log(error)
			);
		}
	}

	
	enableAdding() {
		this.isAdding = true;
		this.customer = {};
		
		this.loadCustomers();
	}
    cancelAdd() {
		this.isAdding = false;
		this.customer = {};
		this.loadCustomers();
	}
	
	cancelSearch() {
		this.isSearching = false;
		this.customer = {};
		this.loadCustomers();
	}
	
	
	submitAdd() {
		this.http.post("/customer", JSON.stringify(this.addCustomerForm.value), this.options).subscribe(
			res => {
				this.customers.push(res.json()); 
				this.addCustomerForm.reset();
			},
			error => console.log(error)
		);
	}
	


 }