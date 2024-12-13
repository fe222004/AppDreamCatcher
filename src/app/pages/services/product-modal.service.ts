import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class ProductModalService {
  private productSubject = new BehaviorSubject<Product | null>(null);
  private userSource = new BehaviorSubject<User | null>(null);

  currentProduct = this.productSubject.asObservable();
  currentUser = this.userSource.asObservable();

  openModal(product: Product): void {
    this.productSubject.next(product);
  }

  closeModal(): void {
    this.productSubject.next(null);
    this.userSource.next(null);
  }
}
