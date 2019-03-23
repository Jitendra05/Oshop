import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminAuthGuardService } from 'admin/services/admin-auth-guard.service';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { CheckOutComponent } from 'shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from 'shopping/components/my-orders/my-orders.component';
import { OrderDetailsComponent } from 'shopping/components/order-details/order-details.component';
import { OrderSuccessComponent } from 'shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from 'shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from 'shopping/components/products/products.component';
import { ShippingFormComponent } from 'shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from 'shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from 'shopping/components/shopping-cart/shopping-cart.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'order-details/:id',
        component: OrderDetailsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      }
    ])
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailsComponent
  ]
})
export class ShoppingModule { }
