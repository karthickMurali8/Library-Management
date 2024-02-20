import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { AppBaseComponent } from './app-base/app-base.component';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MyBooksComponent } from './my-books/my-books.component';
import { CustomersComponent } from './customers/customers.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {MatSelectModule} from '@angular/material/select';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LibraryComponent,
    UserAccountComponent,
    AppBaseComponent,
    AddEditBookComponent,
    MyBooksComponent,
    CustomersComponent,
    EditProfileComponent,
    CustomerInfoComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class LibraryModule { }
