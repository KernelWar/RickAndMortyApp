import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CharactersService } from '../../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as CharacterActions from '../../store/character/character.actions';
import * as CharacterSelectors from '../../store/character/character.selectors';
import * as CharactersSelectors from '../../store/characters/characters.selectors';
import { Character } from '../../models/character.model';
@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit, AfterViewInit {
  character$: Observable<Character | undefined> | undefined 
  loading$: Observable<boolean> | undefined;
  currentPage$: Observable<number>;
  currentPage: number = 0
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.currentPage$ = this.store.select(CharactersSelectors.selectCurrentPage)
    const id = this.route.snapshot.params['id'] | 1;
    this.store.dispatch(CharacterActions.loadCharacter({ id }));
    this.character$ = this.store.select(CharacterSelectors.selectCharacterById(+id));
    
  }
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this.currentPage$.subscribe(page => {
      this.currentPage = page
    })
  }

  goBack() {
    this.router.navigate(["/characters"], {
      queryParams: { page: this.currentPage }
    })
  }

}
