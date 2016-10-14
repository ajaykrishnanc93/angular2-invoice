import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions,URLSearchParams} from '@angular/http';

@Injectable()

export class ProductService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http) {}

loadProducts() {
        return this.http.get('/products').map(res => res.json());
    }

 addProduct(product) {
        return this.http.post("/product", JSON.stringify(product), this.options);
    }


enableSearching(name) {
        return this.http.get("/products/"+name).map(res => res.json());
    }


    submitEdit(product) {
      return this.http.put("/product/"+product._id, JSON.stringify(product), this.options);
    }

    submitRemove(product) {
     return this.http.delete("/product/"+product._id, this.options);
    }

	getProduct(_id){ 
		return this.http.get("/product/"+_id).map(res => res.json());
	}
	 

     search(term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.http
                .get("/productss/"+term, { search })
              
                .map(res => res.json());
  }
	
	
    }