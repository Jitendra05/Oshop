import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {
  orderId: string;
  constructor(private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log('Order Id: ', this.orderId);
  }
}
