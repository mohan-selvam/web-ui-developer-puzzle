import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, MatSnackBarModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to check whether snack-bar has action', async () => {
    const mockRemoveData = createReadingListItem('C')
    fixture.componentInstance.snackBarOpen('success', mockRemoveData, 'Undo');
    const snackBar = await loader.getHarness(MatSnackBarHarness);
    expect(await snackBar.hasAction()).toBe(true);
  }, 10000);

  it('should be able to undo from the list', async () => {
    spyOn(component, 'removeFromReadingList');
    const mockRemoveData = createReadingListItem('C');
    fixture.componentInstance.snackBarOpen('With action', mockRemoveData, 'Undo');
    const snackBar = await loader.getHarness(MatSnackBarHarness);
    expect(await snackBar.getActionDescription()).toBe('Undo');

    snackBar.dismissWithAction();
    component.removeFromReadingList(mockRemoveData);
    expect(component.removeFromReadingList).toHaveBeenCalled();
  }, 10000);

});
