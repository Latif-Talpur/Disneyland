import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutCharacterComponent } from './layout.characters.component';
import { ListCharactersComponent } from './list.characters.component';
import { AddEditCharactersComponent } from './add-edit.characters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import {RouterModule} from '@angular/router';
import { CharacterRoutingModule} from './characters-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        CharacterRoutingModule,
        MatTableModule,
        MatPaginator,
        MatPaginatorModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
      LayoutCharacterComponent,
      ListCharactersComponent,
      AddEditCharactersComponent,
    ]
})
export class CharacterModule { }
