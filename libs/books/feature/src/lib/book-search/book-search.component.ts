import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {

  books$ = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });
  subscription = new Subscription()

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
  }

  formatDate(date: void | string): string {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
    this.snackBarOpen(`Successfully added to the reading list ${book.title}`, book, 'Undo');
  }

  searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(): void {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  removeFromReadingList(book: Book): void {
    const item = { ...book, bookId: book.id }
    this.store.dispatch(removeFromReadingList({ item }));
    this.snackBarOpen(`Successfully removed from the reading list ${book.title}`, book);
  }

  snackBarOpen(message: string, data: Book, action = 'Close'): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
    if(action === 'Undo') {
      this.subscription.add(
        snackBarRef.onAction().subscribe(() => {
          this.removeFromReadingList(data);
        })
      );
    }

    return snackBarRef;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
