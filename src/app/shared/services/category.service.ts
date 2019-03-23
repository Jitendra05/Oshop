import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  create(product) {
    return this.db.list('/categories').push(product);
  }


  get(id) {
    return this.db.object('/categories/' + id);
  }

  update(id, product) {
    this.db.object('/categories/' + id).update(product);
  }

  delete(id) {
    this.db.object('/categories/' + id).remove();
  }
}
