import { UpdateBookDialogComponent } from 'src/app/Components/update-book-dialog/update-book-dialog.component';
import { BooksService } from './../../Services/books.service';
import { Book } from './../../Models/Book';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddBookDialogComponent } from 'src/app/Components/add-book-dialog/add-book-dialog.component';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeleteBookDialogComponent } from 'src/app/Components/delete-book-dialog/delete-book-dialog.component';
import { ViewBookDialogComponent } from 'src/app/Components/view-book-dialog/view-book-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['iD', 'title', 'description', 'pageCount', 'excerpt', 'publishDate', 'actions'];
  booksList = new MatTableDataSource<Book>();
  book: Book;
  statusCodeOK = 200;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table;

  constructor(private booksService: BooksService, private bookDialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  ngAfterViewInit(): void {
    this.booksList.paginator = this.paginator;
  }

  getBooks() {
    this.booksService.getBooks().subscribe((response) => {
      if (response.status == this.statusCodeOK) {
        this.booksList.data = response.body as Book[];
      } else {
        this.toastr.error('An error ocurred', 'Error Status Code: ' + response.status);
      }
    }, err => this.toastr.error('An error ocurred', 'Error Status Code: ' + err.status));
  }

  openAddBookDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '300px';
    dialogConfig.disableClose = true;

    const dialogRef = this.bookDialog.open(AddBookDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.addBook(data);
      }
    });
  }

  openUpdateBookDialog(book: Book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '300px';
    dialogConfig.disableClose = true;
    dialogConfig.data = book;
    const dialogRef = this.bookDialog.open(UpdateBookDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.updateBook(data);
      }
    });
  }


  addBook(data: FormGroup) {
    this.book = {
      title: data.get('title').value,
      description: data.get('description').value,
      pageCount: data.get('pageCount').value,
      excerpt: data.get('excerpt').value,
      publishDate: new Date().toISOString(),
    };

    this.booksService.createBook(this.book).subscribe(response => {
      if (response.status == this.statusCodeOK){
        this.getBooks(); // Refresh Book List
        this.toastr.success('New Book aggregated correctly!');
      } else {
        this.toastr.error('An error ocurred', 'Error Status Code: ' + response.status);
      }
    }, err => this.toastr.error('An error ocurred', 'Error Status Code: ' + err.status));
  }

  updateBook(data: FormGroup) {
    this.book = {
      id: data.get('id').value,
      title: data.get('title').value,
      description: data.get('description').value,
      pageCount: data.get('pageCount').value,
      excerpt: data.get('excerpt').value,
      publishDate: new Date(data.get('publishDate').value).toISOString(),
    };
    this.booksService.updateBook(this.book.id, this.book).subscribe(response => {
      if (response.status == this.statusCodeOK){
        this.getBooks(); // Refresh Book List
        this.toastr.success('Book update correctly!');
      } else {
        this.toastr.error('An error ocurred', 'Error Status Code: ' + response.status);
      }
    }, err => this.toastr.error('An error ocurred', 'Error Status Code: ' + err.status));
  }

  openDeleteBookDialog(book: Book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '300px';
    dialogConfig.disableClose = true;
    dialogConfig.data = book;
    const dialogRef = this.bookDialog.open(DeleteBookDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.deleteBook(data.id);
      }
    });
  }

  deleteBook(id: number) {
    this.booksService.deleteBook(id).subscribe(response => {
      if (response.status == this.statusCodeOK){
        this.getBooks(); // Refresh Book List
        this.toastr.warning('Book deleted correctly');
      } else {
        this.toastr.error('An error ocurred', 'Error Status Code: ' + response.status);
      }
    }, err => this.toastr.error('An error ocurred', 'Error Status Code: ' + err.status));
  }

  openViewBookDialog(book: Book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = '300px';
    dialogConfig.disableClose = true;
    dialogConfig.data = book;
    this.bookDialog.open(ViewBookDialogComponent, dialogConfig);
  }


}
