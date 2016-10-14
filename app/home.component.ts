import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import 'rxjs/Rx';


@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
 
 
})

export class HomeComponent implements  OnInit {

 
	private products = [];
	private options = new RequestOptions(
	{ 
	headers: new Headers(
	{ 
	'Content-Type': 'application/json',
	 'charset': 'UTF-8' })
	 });
private isMap = false;

	private isEditing = false;
	private isSearching = false;
	private isAdding = false;
	private product = {};

	private infoMsg = { body: "", type: "info"};

	private addProductForm: FormGroup;
	private pname = new FormControl("", Validators.required);
	private lat = new FormControl("", Validators.required);
	private lng = new FormControl("", Validators.required);

	constructor(private http: Http, private formBuilder: FormBuilder) {}

  ngOnInit() {
		this.addProductForm = this.formBuilder.group({
			pname: this.pname,
			lat: this.lat,
			lng: this.lng
		});

		this.loadProducts();

	}

	loadProducts() {
		this.http.get("/products").map(res => res.json()).subscribe(
			data => this.products = data,
			error => console.log(error)
		);
	}

	
}