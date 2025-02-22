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
                component: HomeComponent
            },
            {
                path: 'characters',
                component: CharactersComponent
            },
            {
                path: 'thank-you',
                component: ThankYouComponent
            }
        ]
      },
      {
        path: '**',
        redirectTo: ''
      }
];
