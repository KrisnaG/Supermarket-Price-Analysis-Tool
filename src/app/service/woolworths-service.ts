import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductBaseService } from './product-base-service';

@Injectable({
  providedIn: 'root'
})
export class WoolworthsService extends ProductBaseService {
  protected get storeName(): string {
    return 'Woolworths';
  }

  protected get productUrl(): string {
    return '/shop/productdetails';
  }

  protected extractSearchResults(searchResult: string): Record<string, any> | null {
    const match = searchResult.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
    if (match && match[1]) {
      try {
        const data = JSON.parse(match[1]);
        return data?.props?.pageProps?.pdDetails ?? null;
      } catch (e) {
        console.error('Failed to parse Woolworths product JSON:', e);
        return null;
      }
    } else {
      console.warn('Could not find the Woolworths product details in the response.');
      return null;
    }
  }


  protected mapProductData(productData: Record<string, any>, stockcode: string, today: string): Product {
    return {
      date: today,
      stockcode,
      product_name: productData['Product'].Name,
      price: productData['Product'].Price,
      is_on_special: productData['Product'].IsOnSpecial,
      is_half_price: productData['Product'].IsHalfPrice,
      was_price: productData['Product'].WasPrice,
      savings_amount: productData['Product'].SavingsAmount,
      package_size: productData['Product'].PackageSize?.toUpperCase() ?? '',
      unit_weight_in_grams: productData['Product'].UnitWeightInGrams,
      cup_price: productData['Product'].CupPrice,
      cup_measure: productData['Product'].CupMeasure,
      cup_string: productData['Product'].CupString,
      store: this.storeName,
    };
  }
}