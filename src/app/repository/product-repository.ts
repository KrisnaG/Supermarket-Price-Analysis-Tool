import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductRepository {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.initialiseDatabase();
  }

  async initialiseDatabase(): Promise<void> {
    this.db = await this.sqlite.createConnection('products.db', false, 'no-encryption', 1, false);
    await this.db.open();
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS Product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        stockcode TEXT,
        product_name TEXT,
        price REAL,
        is_on_special INTEGER,
        is_half_price INTEGER,
        was_price REAL,
        savings_amount REAL,
        package_size TEXT,
        unit_weight_in_grams REAL,
        cup_price REAL,
        cup_measure TEXT,
        cup_string TEXT,
        store TEXT
      );
    `);
  }

  async saveProduct(product: Product): Promise<void> {
    if (!this.db) return;
    // Upsert logic: insert if not exists
    await this.db.run(
      `INSERT OR IGNORE INTO Product (
        date, stockcode, product_name, price, is_on_special, is_half_price, was_price,
        savings_amount, package_size, unit_weight_in_grams, cup_price, cup_measure, cup_string, store
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.date,
        product.stockcode,
        product.product_name,
        product.price,
        product.is_on_special ? 1 : 0,
        product.is_half_price ? 1 : 0,
        product.was_price,
        product.savings_amount,
        product.package_size,
        product.unit_weight_in_grams,
        product.cup_price,
        product.cup_measure,
        product.cup_string,
        product.store
      ]
    );
  }

  async getAllStockcodesByStore(): Promise<{ [store: string]: string[] }> {
    if (!this.db) return {};
    const res = await this.db.query(
      `SELECT DISTINCT store, stockcode FROM Product`
    );
    const storeStockcodes: { [store: string]: string[] } = {};
    for (const row of res.values ?? []) {
      if (!storeStockcodes[row.store]) {
        storeStockcodes[row.store] = [];
      }
      storeStockcodes[row.store].push(row.stockcode);
    }
    return storeStockcodes;
  }

  async getAllProducts(): Promise<Product[]> {
    if (!this.db) return [];
    const res = await this.db.query(`SELECT * FROM Product`);
    return (res.values ?? []) as Product[];
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.sqlite.closeConnection('products.db', false);
      this.db = null;
    }
  }
}