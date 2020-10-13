import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css']
})
export class AddBookDialogComponent implements OnInit {
BookForm = this.fb.group({
  title: ['', Validators.required],
  description: ['', Validators.required],
  pageCount: ['', Validators.required],
  excerpt: ['', Validators.required]
});
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddBookDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  addBook() {
  this.dialogRef.close(this.BookForm);
  }
}
