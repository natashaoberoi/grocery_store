import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId: string;
  orderDetails: any[];
  cols!: Column[];
  showTable: boolean = false;
  sortField = "product_name";
  sortOrder = '1';
  totalCost: number = 0;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
    this.orderId = route.snapshot.params['id'];
    console.log('order Id -- ' + this.orderId);
   }

  ngOnInit(): void {
    this.orderService.getOrderDetails(this.orderId).subscribe(data => {
      this.orderDetails = data;
      console.log("after onSubmitTemplate addReportTemplate----- " + JSON.stringify(data));
      this.showTable = true;

      this.orderDetails.forEach(item => {
        this.totalCost = this.totalCost + item.total_price;
      })
    });  
    
    this.cols = [
      { field: 'product_name', header: 'Product' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'uom_name', header: 'Unit of Measure' },
      { field: 'price_per_unit', header: 'Cost per Unit'},
      { field: 'total_price', header: 'Total Cost' }
    ]

  }


}