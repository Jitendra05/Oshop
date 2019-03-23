import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnDestroy {
  orderId: string;
  items: any[] = [];
  totalPrice: number;
  totalQuantity: number;
  subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.orderService.getItemsByOrderId(this.orderId).then(items => {
      this.subscription = items.subscribe(params => {
        this.totalPrice = this.populateTotalPrice(params);
        this.totalQuantity = this.populateTotalQuantity(params);
        this.items = params;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private populateTotalPrice(items: any[]) {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.totalPrice;
    }
    return totalPrice;
  }

  private populateTotalQuantity(items: any[]) {
    let totalQty = 0;
    for (const item of items) {
      totalQty += item.quantity;
    }
    return totalQty;
  }

}
