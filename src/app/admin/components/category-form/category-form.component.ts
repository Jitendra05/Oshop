import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categories$;
  category = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.categoryService.get(this.id).take(1).subscribe(p => this.category = p);
    }
  }

  createOrUpdate(category) {
    // If Id exists call update else call create.
    if (this.id) {
      this.categoryService.update(this.id, category);
    } else {
      this.categoryService.create(category);
    }

    this.router.navigate(['/admin/categories']);
  }

  delete() {
    if (!confirm('Are you sure. You want to delete this product?')) {
      return;
    }

    this.categoryService.delete(this.id);
    this.router.navigate(['/admin/categories']);
  }

  ngOnInit() {
  }

}
