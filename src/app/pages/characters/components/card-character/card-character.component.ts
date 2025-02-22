import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../../../../store/characters/character.model';
import { NgStyle } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-card-character',
  standalone: true,
  imports: [
    MatCardModule,
    NgStyle,
    MatChipsModule
  ],
  templateUrl: './card-character.component.html',
  styleUrl: './card-character.component.scss'
})
export class CardCharacterComponent {
  @Input() character: Character = {} as Character;
  constructor() { }
}
