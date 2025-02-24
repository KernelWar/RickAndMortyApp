import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Character } from '../../models/character.model';
import { Store } from '@ngrx/store';
import * as CharacterSelectors from '../../store/characters/characters.selectors';
import * as CharacterActions from '../../store/characters/characters.actions';
import { CardCharacterComponent } from './components/card-character/card-character.component';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  count$: Observable<number>;

  currentPage: number = 1;
  currentLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.characters$ = this.store.select(CharacterSelectors.selectAllCharacters);
    this.loading$ = this.store.select(CharacterSelectors.selectLoading);
    this.count$ = this.store.select(CharacterSelectors.selectCount)
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const page = parseInt(params.get('page') || '1', 10);
      this.currentPage = page;
      this.loadCharacters(this.currentPage);
    });
    this.loading$.subscribe(res => {
      this.currentLoading = res
      if (res && this.scrollContainer) {
        setTimeout(() => {
          this.scrollContainer.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        }, 500)
      }
    })
  }

  ngAfterViewInit(): void {
  }


  loadCharacters(page: number): void {
    this.store.dispatch(CharacterActions.loadCharacters({ page }));
  }

  onPageChanged(event: any): void {
    const page = event.pageIndex + 1;
    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });

  }

}
