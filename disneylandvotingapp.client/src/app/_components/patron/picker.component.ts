import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MessageDialogComponent } from '../notification/message-dialog.component';
import { Character } from '../../_models/character';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CharacterService } from '../../_services/character.service';
import { DialogService } from '../../_services/dialog.service';
import { VoteService } from '../../_services/vote.service';


@Component({
  selector: 'app-picker',
  styleUrls: ['./picker.component.css'],
  templateUrl: './picker.component.html'
})
export class PickerComponent {
  selection: SelectionModel<Character>;
  columnsToDisplay = ["Name", "Picture", "Select"];
  CharacterList: Character[];
  dataSource = new MatTableDataSource<Character>();
  resultsLength: number;
  characters$!: Observable<Character[]>;
  private searchTerms = new Subject<string>();

  constructor(private characterservice: CharacterService, private dialogService: DialogService, private voterservice: VoteService) { }

  ngOnInit(): void {
    this.characterservice.getAll().subscribe(
      (data: Character[]) => {
        this.CharacterList = data
        this.resultsLength = this.CharacterList.length;
        this.dataSource = new MatTableDataSource<any>(this.CharacterList);
      }
    );
    this.characters$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.characterservice.searchCharacters(term)),
    );
  }

  openDialog(characterId: any) {
    this.dialogService.openMessageDialog(characterId);
  }

  
}


