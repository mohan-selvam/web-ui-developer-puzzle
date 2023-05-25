import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createFinishReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call finishedFromReadingList', () => {
    spyOn(component, 'finishedFromReadingList');
    const button = fixture.debugElement.nativeElement.querySelector('[data-cy-finish="finish-1"]');
    button?.click();
    const mockData = createFinishReadingListItem('A')
    component.finishedFromReadingList(mockData);
    expect(component.finishedFromReadingList).toHaveBeenCalled();
  });

});
