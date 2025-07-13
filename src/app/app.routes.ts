import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
    },
    {
        path: 'products-table',
        loadComponent: () => import('./pages/products-table/products-table').then(m => m.ProductsTable),
    },
    {
        path: 'add-product',
        loadComponent: () => import('./pages/add-product/add-product').then(m => m.AddProduct),
    },
    {
        path: 'add-entry',
        loadComponent: () => import('./pages/add-entry/add-entry').then(m => m.AddEntry),
    },
    {
        path: 'price-history',
        loadComponent: () => import('./pages/price-history/price-history').then(m => m.PriceHistory),
    },
    {
        path: 'update-products',
        loadComponent: () => import('./pages/update-products/update-products').then(m => m.UpdateProducts),
    },
    {
        path: 'download-csv',
        loadComponent: () => import('./pages/download-csv/download-csv').then(m => m.DownloadCsv),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    }
];
