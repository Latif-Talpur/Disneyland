import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../_services/character.service';
import { MatTableDataSource } from '@angular/material/table';
import { Character } from '../../_models/character';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
    styleUrls: ['./list.characters.component.css'],
    templateUrl: './list.characters.component.html'
  })
export class ListCharactersComponent implements OnInit {
    columnsToDisplay = ["Name","Picture" ,"Action"];
    CharacterList: Character[];
    dataSource = new MatTableDataSource<Character>();
    resultsLength: number;
    characters$!: Observable<Character[]>;
    private searchTerms = new Subject<string>();

    constructor(private characterservice: CharacterService) {}
        
    ngOnInit(): void {
        this.characterservice.getAll().subscribe(
          (data: Character[]) => {
            this.CharacterList = data
            this.resultsLength= this.CharacterList.length;
            this.dataSource = new MatTableDataSource<any>(this.CharacterList);
          }
        );
        this.characters$ = this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term: string) => this.characterservice.searchCharacters(term)),
        );
    }

    search(term: string): void {
      this.dataSource.filter = term.trim().toLowerCase();
    }
}

