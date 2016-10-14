import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './search';
import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {OrderBy} from './pipes';
import {ProductService} from './product.service';
import {VendorsComponent} from './vendors'
import {ProductsComponent} from './products'
import {CustomersComponent} from './customers'
import {InvoiceComponent} from './invoice'
import{InvoiceListComponent} from './invoiceList'



import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
    imports: [BrowserModule,
    		  HttpModule, Ng2CompleterModule,
    		  FormsModule,
    		  ReactiveFormsModule,
          
          RouterModule.forRoot([
       { path: '', component:HomeComponent },
		   {path:'Vendors',component:VendorsComponent},
           {path:'Customers',component:CustomersComponent},
 {path:'Products',component:ProductsComponent},
    {path:'Invoice',component:InvoiceComponent},
    {path:'InvoiceList',component:InvoiceListComponent}     
          
          ])],
    	
    declarations: [AppComponent,OrderBy,VendorsComponent,SearchComponent,CustomersComponent,ProductsComponent,InvoiceComponent, InvoiceListComponent,  
  HomeComponent],

    providers: [ProductService],
    bootstrap: [AppComponent]
})

export class AppModule {}