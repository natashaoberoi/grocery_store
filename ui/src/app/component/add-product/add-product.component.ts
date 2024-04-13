import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  title = "Add Product";
  product:any = {};

  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitProduct() {
    this.product.uom_id = Number(this.product.uom_id);
    this.productService.addProduct(this.product).subscribe(data => {
      console.log(JSON.stringify(data));
      this.router.navigate(['/products']);
    });
  }

  goBack(){
    this.router.navigate(['/products']);
  }

  

}
