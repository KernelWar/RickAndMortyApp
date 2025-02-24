import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CharactersService } from '../../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
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
    NgFor,
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
  error: boolean = false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.currentPage$ = this.store.select(CharactersSelectors.selectCurrentPage)
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(CharacterActions.loadCharacter({ id }));
    this.character$ = this.store.select(CharacterSelectors.selectCharacterById(+id));
    this.loading$ = this.store.select(CharacterSelectors.selectLoading)
    
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
