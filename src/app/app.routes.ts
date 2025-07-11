import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home').then(m => m.Home),
    },
    {
        path: 'products-table',
        loadComponent: () => import('./products-table/products-table').then(m => m.ProductsTable),
    },
    {
        path: 'add-product',
        loadComponent: () => import('./add-product/add-product').then(m => m.AddProduct),
    },
    {
        path: 'add-entry',
        loadComponent: () => import('./add-entry/add-entry').then(m => m.AddEntry),
    },
    {
        path: 'price-history',
        loadComponent: () => import('./price-history/price-history').then(m => m.PriceHistory),
    },
    {
        path: 'update-products',
        loadComponent: () => import('./update-products/update-products').then(m => m.UpdateProducts),
    },
    {
        path: 'download-csv',
        loadComponent: () => import('./download-csv/download-csv').then(m => m.DownloadCsv),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    }
];
