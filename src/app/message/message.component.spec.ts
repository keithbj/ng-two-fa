import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';

class WindowStub {
  history = { state: { data: { message: 'Message Test' } } };
}

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [{ provide: Window, useClass: WindowStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Hide component dispay in Karma.
    fixture.debugElement.nativeElement.style.visibility = 'hidden';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
