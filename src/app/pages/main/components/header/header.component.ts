import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatIconModule,
    MatButtonModule,
    BreadcrumbsComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toogleEvent: EventEmitter<Boolean> = new EventEmitter();


  toggleActive() {
    this.toogleEvent.emit(true)
  }
}
