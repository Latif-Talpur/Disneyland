import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PickerComponent } from './patron/picker.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {FormsComponent} from './user-management/userdetail'

const routes: Routes = [
  { path: 'home', component: PickerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path : 'adduser',component: FormsComponent},
  { path : 'updateuser',component: FormsComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
