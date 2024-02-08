import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PickerComponent } from './patron/picker.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const routes: Routes = [
  { path: 'home', component: PickerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'users', loadChildren: usersModule },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
