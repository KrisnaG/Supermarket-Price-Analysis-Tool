import { Component, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Product } from '../../models/product';
import { ProductCoordinatorService } from '../../service/product-coordinator-service';
import { ProductRepository } from '../../repository/product-repository';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonSelect,
  IonItem,
  IonSelectOption,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
  providers: [ProductCoordinatorService, ProductRepository],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonSelect,
    IonItem,
    IonSelectOption,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    TitleCasePipe,
    FormsModule
  ]
})
export class AddProduct {
  stockcode: string = '';
  store: string = '';
  stores: string[] = [];
  fetchedProduct = signal<Product | null>(null);
  fetchError = signal<string>('');
  addSuccess: boolean = false;
  addError: string = '';

  constructor(
    private coordinator: ProductCoordinatorService,
    private repo: ProductRepository
  ) { }

  async ngOnInit() {
    this.stores = this.coordinator.getStores();
    if (this.stores.length > 0) {
      this.store = this.stores[0];
    }
  }

  async fetchProduct() {
    this.fetchedProduct.set(null);
    this.fetchError.set('');
    this.addSuccess = false;
    this.addError = '';
    try {
      this.fetchedProduct.set(await this.coordinator.getProductByStockcode(this.stockcode, this.store));
    } catch (e: any) {
      this.fetchError.set(e.message || 'Failed to fetch product.');
    }
  }

  async addProduct() {
    if (!this.fetchedProduct()) return;
    try {
      await this.repo.saveProduct(this.fetchedProduct()!);
      this.addSuccess = true;
      this.addError = '';
    } catch (e: any) {
      this.addError = e.message || 'Failed to add product to database.';
      this.addSuccess = false;
    }
  }
}