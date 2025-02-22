import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools  } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { characterReducer } from './store/characters/character.reducer';
import { CharacterEffects } from './store/characters/character.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ characters: characterReducer }),
    provideEffects([CharacterEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: true}),
  ]
};
