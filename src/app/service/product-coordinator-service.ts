import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { WoolworthsService } from './woolworths-service';
import { ProductBaseService } from './product-base-service';

@Injectable({
  providedIn: 'root'
})
export class ProductCoordinatorService {
  private services: { [store: string]: ProductBaseService } = {};

  constructor(
    private woolworthsService: WoolworthsService,
  ) {
    this.services = {
      woolworths: this.woolworthsService,
    };
  }

  getStores(): string[] {
    return Object.keys(this.services);
  }

  async updateAllProducts(productLists: { [store: string]: string[] }): Promise<Product[]> {
    const allProducts: Product[] = [];

    for (const storeName of Object.keys(this.services)) {
      const service = this.services[storeName];
      if (productLists[storeName] && productLists[storeName].length > 0) {
        const storeProducts = await service.getProductsByStockcodes(productLists[storeName]);
        allProducts.push(...storeProducts);
      }
    }

    return allProducts;
  }

  async getProductByStockcode(stockcode: string, store: string): Promise<Product> {
    if (this.services[store]) {
      return this.services[store].getProductByStockcode(stockcode);
    } else {
      throw new Error(`Store '${store}' is not supported.`);
    }
  }
}