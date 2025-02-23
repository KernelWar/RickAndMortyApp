import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Character } from '../../models/character.model';
import { Store } from '@ngrx/store';
import * as CharacterSelectors from '../../store/characters/character.selectors';
import * as CharacterActions from '../../store/characters/character.actions';
import { CardCharacterComponent } from './components/card-character/card-character.component';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';
@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    CardCharacterComponent,
    SkeletonCardComponent
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit, AfterViewInit {
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  hasMore$: Observable<boolean>;
  currentPage$: Observable<number>; 
  count$: Observable<number>; 

  currentPage: number = 1;
  currentLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store) {
    this.characters$ = this.store.select(CharacterSelectors.selectAllCharacters);
    this.loading$ = this.store.select(CharacterSelectors.selectLoading);
    this.hasMore$ = this.store.select(CharacterSelectors.selectHasMore);
    this.currentPage$ = this.store.select(CharacterSelectors.selectCurrentPage)
    this.count$ = this.store.select(CharacterSelectors.selectCount)
  }

  ngOnInit(): void {
    this.currentPage$.subscribe(page => {
      this.currentPage = page
      this.loadCharacters(this.currentPage);
    })
    this.loading$.subscribe(res => {
      this.currentLoading = res
    })
  }

  ngAfterViewInit(): void {
    this.currentPage$.subscribe(page => {
      if (this.paginator) {
        this.paginator.pageIndex = page - 1; 
      }
    });

    this.paginator.page.subscribe(event => {
      this.onPageChanged(event); 
    });
  }


  loadCharacters(page: number): void {
    this.store.dispatch(CharacterActions.loadCharacters({ page }));
  }

  onPageChanged(event: any): void {
    const page = event.pageIndex + 1;
    this.store.dispatch(CharacterActions.updateCurrentPage({ page }));
    this.loadCharacters(page);
  }

}
