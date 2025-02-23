import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FullCharacter } from '../../models/character.model';
import { CharactersService } from '../../services/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent implements OnInit {
  character$: Observable<FullCharacter> | undefined

  constructor(
    private characterService: CharactersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.character$ = this.characterService.getCharacterById(+id);
    }
  }

  goBack(){
    this.router.navigateByUrl("/characters")
  }

}
