import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/Models/Book';

@Component({
  selector: 'app-update-book-dialog',
  templateUrl: './update-book-dialog.component.html',
  styleUrls: ['./update-book-dialog.component.css']
})
export class UpdateBookDialogComponent implements OnInit {
  BookForm = this.fb.group({
    id: [this.book.id, Validators.required],
    title: [this.book.title, Validators.required],
    description: [this.book.description, Validators.required],
    pageCount: [this.book.pageCount, Validators.required],
    excerpt: [this.book.excerpt, Validators.required],
    publishDate: [this.book.publishDate, Validators.required]
  });
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UpdateBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  updateBook() {
  this.dialogRef.close(this.BookForm);
  }
}
