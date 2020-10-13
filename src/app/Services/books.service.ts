import { Book } from '../Models/Book';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  apiBookURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) {}

  getBooks() {
    return this.httpClient.get(this.apiBookURL + '/books', {observe: 'response'});
  }

  getBook(id: number) {
    return this.httpClient.get(this.apiBookURL + '/books/' + id, {observe: 'response'});
  }

  updateBook(id: number, book: Book) {
    return this.httpClient.put(this.apiBookURL + '/books/' + id, book, {observe: 'response'});
  }

  createBook(book: Book) {
    return this.httpClient.post(this.apiBookURL + '/books', book, {observe: 'response'});
  }

  deleteBook(id: number) {
    return this.httpClient.delete(this.apiBookURL + '/books/' + id, {observe: 'response'});
  }
}
