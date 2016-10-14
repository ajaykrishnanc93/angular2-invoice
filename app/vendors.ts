import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import 'rxjs/Rx';


@Component({
	selector: 'vendor',
	templateUrl: 'app/vendors.html',
 
 
})

export class VendorsComponent implements  OnInit {

  
	private vendors = [];
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
	private vendor = {};

	
	private addVendorForm: FormGroup;
	private vname = new FormControl("", Validators.required);
	private vplace = new FormControl("", Validators.required);
	private vphone = new FormControl("", Validators.required);
    private vemail = new FormControl("", Validators.required);
	constructor(private http: Http, private formBuilder: FormBuilder) {}

  ngOnInit() {
		this.addVendorForm = this.formBuilder.group({
			vname: this.vname,
			vplace: this.vplace,
			vphone: this.vphone,
		    vemail:this.vemail
		});

		this.loadVendors();
	}

	loadVendors() {
		this.http.get("/vendors").map(res => res.json()).subscribe(
			data => this.vendors = data,
			error => console.log(error)
		);
	}

	
	 
	 enableEditing(vendor) {
		this.isEditing = true;
		this.vendor = vendor;
	}


	
	cancelEditing() {
		this.isEditing = false;
		this.vendor = {};
		
		this.loadVendors();
	}

	
	enableSearching(name){
		this.isSearching = true;
		this.http.get("/vendors/"+name).map(res => res.json()).subscribe(
			data => this.vendors = data,
			error => console.log(error)
		);
	}
	
	
	
	
	submitEdit(vendor) {
		this.http.put("/vendor/"+vendor._id, JSON.stringify(vendor), this.options).subscribe(
			res => {
				this.isEditing = false;
				this.vendor = vendor;
				},
			error => console.log(error)
		);
	
	}

    submitRemove(vendor) {
		var delOptions = new RequestOptions({
			body: '', 
			headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })}
		);
		if(window.confirm("Do you want to permanently delete this item?")) {
			this.http.delete("/vendor/"+vendor._id, delOptions).subscribe(
				res => {
					var pos = this.vendors.map((e) => { return e._id }).indexOf(vendor._id);
					this.vendors.splice(pos, 1);
					
				},
				error => console.log(error)
			);
		}
	}

	
	enableAdding() {
		this.isAdding = true;
		this.vendor = {};
		
		this.loadVendors();
	}
    cancelAdd() {
		this.isAdding = false;
		this.vendor = {};
		this.loadVendors();
	}
	
	cancelSearch() {
		this.isSearching = false;
		this.vendor = {};
		this.loadVendors();
	}
	
	
	submitAdd() {
		this.http.post("/vendor", JSON.stringify(this.addVendorForm.value), this.options).subscribe(
			res => {
				this.vendors.push(res.json()); 
				this.addVendorForm.reset();
			},
			error => console.log(error)
		);
	}
	


 }