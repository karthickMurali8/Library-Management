import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { AppBaseComponent } from './app-base/app-base.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { canAuthorise } from '../route-guards/canAuthorise.guard';

const routes: Routes = [
  {
    path: '',
    component: AppBaseComponent,
    children: [
      {
        path: 'library',
        component: LibraryComponent
      },
      {
        path: 'myBooks',
        component: MyBooksComponent,
        canActivate: [canAuthorise]
      },
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [canAuthorise]
      },
      {
        path: 'customers/:id',
        component: CustomerInfoComponent,
        canActivate: [canAuthorise]
      },

      {
        path: '**',
        redirectTo: 'library'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
