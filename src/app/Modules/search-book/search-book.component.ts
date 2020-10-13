import { BooksService } from './../../Services/books.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/Book';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css'],
})
export class SearchBookComponent implements OnInit {
  BookForm: FormGroup;
  bookID: number;
  book: Book;
  showBookResult: boolean;
  statusOK = 200;
  statusNotRecordFound = 204;
  constructor(private fb: FormBuilder, private booksService: BooksService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  searchBook() {
    this.booksService.getBook(this.bookID).subscribe((response) => {
      if (response.status == this.statusOK) {
        this.book = response.body as Book;
        this.BookForm = this.fb.group({
          id: [this.book.id],
          title: [this.book.title],
          description: [this.book.description],
          pageCount: [this.book.pageCount],
          excerpt: [this.book.excerpt],
          publishDate: [this.book.publishDate],
        });
        this.showBookResult = true;
      } else if (response.status == this.statusNotRecordFound){
        this.toastr.error("Not Record Found")
      } else {
        this.showBookResult = false;
        this.toastr.error('An error ocurred', 'Error Status Code: ' + response.status);
      }
    }, err => this.toastr.error('An error ocurred', 'Error Status Code: ' + err.status));
  }
}
