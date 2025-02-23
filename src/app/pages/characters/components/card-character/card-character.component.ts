import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../../../../models/character.model';
import { NgStyle } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-character',
  standalone: true,
  imports: [
    MatCardModule,
    NgStyle,
    MatChipsModule,
    RouterModule
  ],
  templateUrl: './card-character.component.html',
  styleUrl: './card-character.component.scss'
})
export class CardCharacterComponent {
  @Input() character: Character = {} as Character;
  constructor() { }
}
