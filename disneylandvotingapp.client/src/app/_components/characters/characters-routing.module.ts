import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutCharacterComponent } from './layout.characters.component';
import { ListComponent } from './list.characters.component';
import { AddEditCharactersComponent } from './add-edit.characters.component';

const routes: Routes = [
    {
        path: '', component: LayoutCharacterComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddEditCharactersComponent },
            { path: 'edit/:id', component: AddEditCharactersComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
