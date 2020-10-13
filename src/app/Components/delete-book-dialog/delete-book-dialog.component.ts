import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/Models/Book';

@Component({
  selector: 'app-delete-book-dialog',
  templateUrl: './delete-book-dialog.component.html',
  styleUrls: ['./delete-book-dialog.component.css']
})
export class DeleteBookDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteBookDialogComponent>, @Inject(MAT_DIALOG_DATA) public book: Book) { }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close();
  }

  deleteBook() {
  this.dialogRef.close(this.book);
  }

}
