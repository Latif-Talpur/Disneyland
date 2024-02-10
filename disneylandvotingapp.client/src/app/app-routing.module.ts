import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './_components/users/register/register.component';
import { LoginComponent } from './_components/login/login.component';
import { PickerComponent } from './_components/patron/picker.component';
import { ChangePasswordComponent } from './_components/users/password-change/change-password.component';
import {CharacterPopularityReportComponent} from './_components/character-popularity-report/character-popularity-report.component';
const usersModule = () => import('./_components/users/users.module').then(x => x.UsersModule);
const characterModule = () => import('./_components/characters/characters.module').then(x => x.CharacterModule);
const routes: Routes = [
  { path: 'home', component: PickerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'report', component: CharacterPopularityReportComponent },
  { path: 'users', loadChildren: usersModule },
  { path: 'characters', loadChildren: characterModule },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
