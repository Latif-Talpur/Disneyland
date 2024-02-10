import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutCharacterComponent } from './layout.characters.component';
import { ListCharactersComponent } from './list.characters.component';
import { AddEditCharactersComponent } from './add-edit.characters.component';

const routes: Routes = [
    {
        path: '', component: LayoutCharacterComponent,
        children: [
            { path: '', component: ListCharactersComponent },
            { path: 'add', component: AddEditCharactersComponent },
            { path: 'characteredit/:id', component: AddEditCharactersComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CharacterRoutingModule { }
