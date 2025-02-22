import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

export const routes: Routes = [   
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'characters',
                loadComponent: () => import('./pages/characters/characters.component').then(m => m.CharactersComponent)
            },
            {
                path: 'thank-you',
                loadComponent: () => import('./pages/thank-you/thank-you.component').then(m => m.ThankYouComponent)
            }
        ]
      },
      {
        path: '**',
        redirectTo: ''
      }
];
