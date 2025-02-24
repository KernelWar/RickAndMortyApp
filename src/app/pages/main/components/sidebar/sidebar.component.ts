import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { take } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() changeDrawerToogle = new EventEmitter<void>();
  selectEmployees: boolean = false
  selectWelcome: boolean = false

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) {

  }

  drawerToogle(){
    this.breakpointObserver.observe(['(max-width: 600px)']).pipe(
      take(1) 
    ).subscribe(result => {
      if (result.matches) {
        this.changeDrawerToogle.emit()
      }
    });
    
  }
}
