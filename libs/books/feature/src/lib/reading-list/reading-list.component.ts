import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { finishFromReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) { }

  removeFromReadingList(item: ReadingListItem): void {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  finishedFromReadingList(data: ReadingListItem): void {
    const item = {...data, finished: true, finishedDate: new Date().toISOString() };
    this.store.dispatch(finishFromReadingList({ item }));
  }

  formatDate(date: void | string): string {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

}
