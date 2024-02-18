import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { AppBaseComponent } from './app-base/app-base.component';

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
