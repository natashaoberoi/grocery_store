import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  showTable:boolean = false;

  products!: any[];

  cols!: Column[];

  sortField = "product_id";
  sortOrder = '1';

  constructor(private productService: ProductService, private router: Router) { 
    

  }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log("after onSubmitTemplate addReportTemplate----- " + JSON.stringify(data));
      this.showTable = true;
    });

    this.cols = [
      { field: 'product_id', header: 'ID' },
      { field: 'name', header: 'Product Name' },
      { field: 'price_per_unit', header: 'Price per Unit' },
      { field: 'uom_name', header: 'Unit of Measure' }
    ]


  }

  deleteProduct(id){
    console.log(JSON.stringify(id))

    this.productService.deleteProduct(id).subscribe(data => {
      console.log(JSON.stringify(data));

      this.productService.getProducts().subscribe(data => {
        this.products = data;
        console.log("after onSubmitTemplate addReportTemplate----- " + JSON.stringify(data));
       
      });
     
    });
  }

  addProduct(){
    this.router.navigate(['/addproducts']);

  }

}
