import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'common',
    loadChildren: () => import('./common-pages/common-pages.module').then(m => m.CommonPagesModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)
  },
  
  {
    path: '**',
    redirectTo: 'common'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
