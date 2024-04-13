import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  title = "Create New Order";
  order:any = {};
  cols!: Column[];
  newProduct:any = {};
  display:boolean = false;
  products:any[] = [];
  selectedProduct:any;


  constructor(private orderService: OrderService, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.order.products = [];

    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log("after onSubmitTemplate addReportTemplate----- " + JSON.stringify(data));
    });

    this.cols = [
      { field: 'name', header: 'Product' },
      { field: 'quantity', header: 'Quantity' }
    ]
  }

  onSubmitOrder() {
    console.log(JSON.stringify(this.order));
    this.orderService.insertOrder(this.order).subscribe(data => {
      console.log(JSON.stringify(data));
      this.router.navigate(['/orders']);
    });
  }

  onRowAdd(){
    this.newProduct = {};
    this.display = true;
  }

  onSubmitAddProduct() {
    console.log(JSON.stringify(this.selectedProduct));

    console.log(JSON.stringify(this.newProduct));
    const tempObj: any = {};
    tempObj.quantity = this.newProduct.quantity;
    tempObj.name = this.selectedProduct.name;
    tempObj.product_id = String(this.selectedProduct.product_id);
    this.order.products.push(tempObj);
    console.log(JSON.stringify(this.order));

  }

  onCancel() {
    this.display = false;

  }

}
