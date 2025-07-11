import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCsv } from './download-csv';

describe('DownloadCsv', () => {
  let component: DownloadCsv;
  let fixture: ComponentFixture<DownloadCsv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadCsv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadCsv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
