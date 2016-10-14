export interface Customer {
    name: string;
    email:string;
    inumber:number;
    tcost:number;
    tax:number;
    tap:number;
    invoices: Invoice[];
}

export interface Invoice {
    pname: string;
    qty: number;
    cost:number;
    total:number;
}