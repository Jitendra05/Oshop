import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Category } from 'shared/models/category';
import { Subscription } from '../../../../../node_modules/rxjs/Subscription';
import { DataTableResource } from '../../../../../node_modules/angular-4-data-table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  categories: any[] = [];
  subscription: Subscription;
  dataTableResource: DataTableResource<Category>;
  items: any[] = [];
  itemCount: number;

  constructor(private categoryService: CategoryService) {
    this.subscription = this.categoryService.getAll()
      .subscribe(categories => {
        this.categories = categories;
        console.log(this.categories);
        this.initDataTableResource(categories);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initDataTableResource(categories: any[]) {
    this.dataTableResource = new DataTableResource(categories);
    this.dataTableResource.query({ offset: 0, limit: 10 }).then(items => this.items = items);
    this.dataTableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.dataTableResource) { return; }
    this.dataTableResource.query(params).then(items => this.items = items);
  }

  filter(query: string) {
    console.log(query, ' ', this.categories);

    const filteredProducts = query ?
      this.categories.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()))
          : this.categories;
          this.initDataTableResource(filteredProducts);
  }

}
