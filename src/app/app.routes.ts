import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home').then(m => m.Home),
    },
    {
        path: 'home/:id',
        loadComponent: () => import('./detail/detail').then(m => m.Detail),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    }
];
