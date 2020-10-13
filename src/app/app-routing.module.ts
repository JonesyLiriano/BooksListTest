import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'books',
  loadChildren: () => import('./Modules/books/books.module').then(m => m.BooksModule)
},
{
  path: 'searchBook',
  loadChildren: () => import('./Modules/search-book/search-book.module').then(m => m.SearchBookModule)
},
{ path: '', pathMatch: 'full', redirectTo: 'books' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
