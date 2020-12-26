import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CesTreeComponent } from './ces-tree.component';

describe('CesTreeComponent', () => {
  let component: CesTreeComponent;
  let fixture: ComponentFixture<CesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CesTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
