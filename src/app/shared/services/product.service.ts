import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAllProducts() {
    return this.db.list('/products');
  }

  getProduct(id) {
    return this.db.object('/products/' + id);
  }

  updateProduct(id, product) {
    this.db.object('/products/' + id).update(product);
  }

  deleteProduct(id) {
    this.db.object('/products/' + id).remove();
  }
}
