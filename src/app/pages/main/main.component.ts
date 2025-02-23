import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    HeaderComponent,
    SidebarComponent,
    NgIf,
    MatProgressSpinnerModule,
    LoadingPageComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  @ViewChild(MatDrawer) matDrawer!: MatDrawer;
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isLoading = false;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoading = false;
      }
    });
  }

  drawerToogle(){
    this.matDrawer.toggle()
  }
}
