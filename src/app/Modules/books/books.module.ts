import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { RouterModule, Routes } from '@angular/router';
import { AddBookDialogComponent } from '../../Components/add-book-dialog/add-book-dialog.component';
import { UpdateBookDialogComponent } from 'src/app/Components/update-book-dialog/update-book-dialog.component';
import { DeleteBookDialogComponent } from 'src/app/Components/delete-book-dialog/delete-book-dialog.component';
import { ViewBookDialogComponent } from 'src/app/Components/view-book-dialog/view-book-dialog.component';
import { SharedModule } from 'src/app/Shared/shared/shared.module';

export const routes: Routes = [
  {path: '', component: BooksComponent}
];

@NgModule({
  declarations: [BooksComponent, AddBookDialogComponent, UpdateBookDialogComponent, DeleteBookDialogComponent, ViewBookDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [AddBookDialogComponent, UpdateBookDialogComponent, DeleteBookDialogComponent, ViewBookDialogComponent]
})
export class BooksModule { }
