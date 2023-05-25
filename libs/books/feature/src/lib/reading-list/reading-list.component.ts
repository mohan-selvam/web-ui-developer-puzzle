import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList);
  subscription = new Subscription()

  constructor(private readonly store: Store,
    private snackBar: MatSnackBar) { }

  removeFromReadingList(item: ReadingListItem): void {
    this.store.dispatch(removeFromReadingList({ item }));
    this.snackBarOpen(`Successfully removed to the reading list ${item.title}`, item, 'Undo');
  }

  undoReadingList(item: ReadingListItem): void {
    const book = { id: item.bookId, ...item };
    this.store.dispatch(addToReadingList({ book }));
    this.snackBarOpen(`Successfully undo to the reading list ${book.title}`, book);
  }

  snackBarOpen(message: string, data: ReadingListItem, action = 'Close'): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
    if(action === 'Undo') {
      this.subscription.add(
        snackBarRef.onAction().subscribe(() => {
          this.undoReadingList(data);
        })
      );
    }

    return snackBarRef;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
