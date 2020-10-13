import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/Models/Book';

@Component({
  selector: 'app-view-book-dialog',
  templateUrl: './view-book-dialog.component.html',
  styleUrls: ['./view-book-dialog.component.css']
})
export class ViewBookDialogComponent implements OnInit {

  BookForm = this.fb.group({
    id: [this.book.id, Validators.required],
    title: [this.book.title, Validators.required],
    description: [this.book.description, Validators.required],
    pageCount: [this.book.pageCount, Validators.required],
    excerpt: [this.book.excerpt, Validators.required],
    publishDate: [this.book.publishDate, Validators.required]
  });
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ViewBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
