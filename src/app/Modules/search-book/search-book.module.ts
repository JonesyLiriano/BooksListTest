import { SearchBookComponent } from './search-book.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared/shared.module';

export const routes: Routes = [
  {path: '', component: SearchBookComponent}
];

@NgModule({
  declarations: [SearchBookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SearchBookModule { }
