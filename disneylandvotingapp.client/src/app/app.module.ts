import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PickerComponent } from './patron/picker.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PickerComponent,
    RegisterComponent,
    MessageDialogComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    DatePipe,
    MatPaginator,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatAccordion,
    MatExpansionModule,
    FontAwesomeModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule
    
  ],
  providers: [authInterceptorProviders, provideAnimationsAsync(),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
