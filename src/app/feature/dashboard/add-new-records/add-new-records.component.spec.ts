import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRecordsComponent } from './add-new-records.component';

describe('AddNewRecordsComponent', () => {
  let component: AddNewRecordsComponent;
  let fixture: ComponentFixture<AddNewRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
