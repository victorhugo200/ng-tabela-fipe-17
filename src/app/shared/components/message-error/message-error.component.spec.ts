import { ComponentRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MessageErrorComponent } from "./message-error.component";

describe('MessageErrorComponent', () => {
  let fixure: ComponentFixture<MessageErrorComponent>;
  let component: MessageErrorComponent;
  let componentRef: ComponentRef<MessageErrorComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [MessageErrorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixure = TestBed.createComponent(MessageErrorComponent);
    componentRef = fixure.componentRef;
    component = fixure.componentInstance;
  })

  it('should set text', () => {
    const message = 'Há um erro no campo x.';
    componentRef.setInput('text', message);
    expect(component.text()).toBe(message);
  });
})
