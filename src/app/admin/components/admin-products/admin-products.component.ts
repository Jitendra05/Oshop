import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  subscription: Subscription;
  dataTableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAllProducts()
      .subscribe(products => {
        this.products = products;
        this.initDataTableResource(products);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initDataTableResource(products: Product[]) {
    this.dataTableResource = new DataTableResource(products);
    this.dataTableResource.query({ offset: 0 , limit: 10}).then(items => this.items = items);
    this.dataTableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.dataTableResource) { return; }
    this.dataTableResource.query(params).then(items => this.items = items);
  }

  filter(query: string) {
    const filteredProducts = query ?
      this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      : this.products;
    this.initDataTableResource(filteredProducts);
  }

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
      alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { return item.title; }

}
