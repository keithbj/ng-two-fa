import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemErrorComponent } from './system-error.component';

class WindowStub {
  history = { state: { data: { message: 'System Error Test' } } };
}

describe('SystemErrorComponent', () => {
  let component: SystemErrorComponent;
  let fixture: ComponentFixture<SystemErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemErrorComponent],
      providers: [{ provide: Window, useClass: WindowStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Hide component dispay in Karma.
    fixture.debugElement.nativeElement.style.visibility = 'hidden';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
