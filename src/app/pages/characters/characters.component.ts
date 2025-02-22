import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Character } from '../../store/characters/character.model';
import { Store } from '@ngrx/store';
import * as CharacterSelectors from '../../store/characters/character.selectors';
import * as CharacterActions from '../../store/characters/character.actions';
@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  @ViewChild('scrollAnchor', { static: true }) scrollAnchor!: ElementRef;
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  hasMore$: Observable<boolean>;
  currentPage: number = 1; 
  constructor(private store: Store) {
    this.characters$ = this.store.select(CharacterSelectors.selectAllCharacters);
    this.loading$ = this.store.select(CharacterSelectors.selectLoading);
    this.hasMore$ = this.store.select(CharacterSelectors.selectHasMore);
  }
  ngOnInit(): void {
    this.store.dispatch(CharacterActions.loadCharacters({ page: this.currentPage }));
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          this.loadMoreCharacters();
        }
      },
      { root: null, threshold: 1.0 }
    );

    observer.observe(this.scrollAnchor.nativeElement);
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    console.log("onScroll", scrollPosition, pageHeight);
    if (scrollPosition >= pageHeight - 200) {
      console.log('Load more characters');
      this.loadMoreCharacters();
    }
  }

  loadMoreCharacters(): void {
    this.store.select(CharacterSelectors.selectCurrentPage).subscribe((page) => {
      this.currentPage = page;
    });

    this.store.select(CharacterSelectors.selectHasMore).subscribe((hasMore) => {
      if (hasMore) {
        this.store.dispatch(CharacterActions.loadCharacters({ page: this.currentPage + 1 }));
      }
    });
  }
}
