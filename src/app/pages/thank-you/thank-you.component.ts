import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {
  constructor() {
    console.log("ThankYouComponent")
  }
  
  ngOnInit(): void {
    
  }

}
