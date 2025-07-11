import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { WoolworthsService } from './woolworths-service';
// import { ColesService } from './coles-service'; // Uncomment if implemented
import { ProductBaseService } from './product-base-service';

@Injectable({
  providedIn: 'root'
})
export class ProductCoordinatorService {
  private services: { [store: string]: ProductBaseService } = {};

  constructor(
    private woolworthsService: WoolworthsService,
    // private colesService: ColesService // Uncomment if implemented
  ) {
    this.services = {
      woolworths: this.woolworthsService,
      // coles: this.colesService // Uncomment if implemented
    };
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