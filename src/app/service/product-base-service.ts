import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export abstract class ProductBaseService {
  hasBeenRedirected = false;

  // Abstract properties
  protected abstract get storeName(): string;
  protected abstract get productUrl(): string;

  // Abstract methods
  protected abstract extractSearchResults(searchResult: string): Record<string, any> | null;
  protected abstract mapProductData(productData: Record<string, any>, stockcode: string, today: string): Product;

  async fetchProduct(productId: string, url?: string): Promise<Record<string, any> | null> {
    if (!url) {
      url = `${this.productUrl}/${productId}`;
    }

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    };

    try {
      const response = await fetch(url, { headers });

      // 200 - OK | 308 - Permanent Redirect
      if (response.status !== 200 && response.status !== 308) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle the 308 Permanent Redirect
      if (response.status === 308 && !this.hasBeenRedirected) {
        this.hasBeenRedirected = true;
        const newUrl = response.headers.get('Location');
        if (newUrl) {
          return this.fetchProduct(productId, newUrl);
        }
      }

      this.hasBeenRedirected = false;
      const decodedStr = await response.text();
      return this.extractSearchResults(decodedStr);

    } catch (e) {
      console.error(`Error fetching product ${productId}: ${e}`);
      return null;
    }
  }

  async getProductsByStockcodes(stockcodes: string[]): Promise<Product[]> {
    const today = new Date().toISOString().slice(0, 10);
    const rows: Product[] = [];

    for (const stockcode of stockcodes) {
      const productData = await this.fetchProduct(stockcode);
      if (productData) {
        const row = this.mapProductData(productData, stockcode, today);
        rows.push(row);
      } else {
        throw new Error(`Product with stockcode ${stockcode} not found in ${this.storeName}.`);
      }
    }

    return rows;
  }

  async getProductByStockcode(stockcode: string): Promise<Product> {
    const products = await this.getProductsByStockcodes([stockcode]);
    if (products && products[0]) {
      return products[0];
    }
    throw new Error(`Product with stockcode ${stockcode} not found in ${this.storeName}.`);
  }
}