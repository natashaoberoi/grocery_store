import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders!: any[];
  cols!: Column[];
  showTable: boolean = false;
  sortField = "order_id";
  sortOrder = '1';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      console.log("after onSubmitTemplate addReportTemplate----- " + JSON.stringify(data));
      this.showTable = true;
    }); 

    this.cols = [
      { field: 'order_id', header: 'Order ID' },
      { field: 'customer_name', header: 'Customer Name' },
      { field: 'total', header: 'Total cost ($)' },
      { field: 'date_created', header: 'Date created' }
    ]
  }

  deleteOrder(id){
    console.log(JSON.stringify(id))

    this.orderService.deleteOrder(id).subscribe(data => {
      console.log(JSON.stringify(data));

      this.orderService.getOrders().subscribe(data => {
        this.orders = data;
        console.log("after onSubmitTemplate addReportTemplate----- " + JSON.stringify(data));
       
      });
     
    });
  }

  getOrderDetails(id){
    console.log(JSON.stringify(id))

    this.orderService.getOrderDetails(id).subscribe(data => {
      console.log(JSON.stringify(data));

      /*this.orderService.getOrders().subscribe(data => {
        this.orders = data;
        console.log("after onSubmitTemplate addReportTemplate----- " + JSON.stringify(data));
       
      });*/
     
    });
  }



}
