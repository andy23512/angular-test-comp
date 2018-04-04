import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

describe('Isolated', () => {
  let subject: LoginFormComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginFormComponent],
      imports: [FormsModule, ReactiveFormsModule]
    });
  });

  beforeEach(
    inject([LoginFormComponent], (loginForm: LoginFormComponent) => {
      subject = loginForm;
    })
  );

  it('should send credentials on submit', () => {
    const expectedEmail = 'test@gmail.com';
    const expectedPassword = 'abc123';
    subject.submitted.subscribe(({ email, password }) => {
      expect(email).toEqual(expectedEmail);
      expect(password).toEqual(expectedPassword);
    });

    subject.onSubmit({ email: expectedEmail, password: expectedPassword });
  });
});

describe('Shallow', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginFormComponent],
        imports: [FormsModule, ReactiveFormsModule]
      });
      TestBed.compileComponents();
    })
  );

  it('should send credentials on submit', () => {
    const fixture = TestBed.createComponent(LoginFormComponent);
    const component: LoginFormComponent = fixture.componentInstance;
    const element = fixture.nativeElement;
    const expectedEmail = 'test@gmail.com';
    const expectedPassword = 'abc123';

    fixture.detectChanges();

    element.querySelector('#login-email').value = expectedEmail;
    element.querySelector('#login-email').dispatchEvent(new Event('input'));
    element.querySelector('#login-password').value = expectedPassword;
    element.querySelector('#login-password').dispatchEvent(new Event('input'));

    fixture.detectChanges();

    component.submitted.subscribe(({ email, password }) => {
      expect(email).toEqual(expectedEmail);
      expect(password).toEqual(expectedPassword);
    });

    element.querySelector('button[type="submit"]').click();
  });
});

describe('Integration', () => {
  @Component({
    selector: 'site',
    template: `<app-login-form [email]="email" (submitted)="onFormSubmit($event)"></app-login-form>`
  })
  class SiteComponent {
    email = 'test@gmail.com';
    storedEmail: string;
    storedPassword: string;

    onFormSubmit({ email, password }) {
      this.storedEmail = email;
      this.storedPassword = password;
    }
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginFormComponent, SiteComponent],
        imports: [FormsModule, ReactiveFormsModule]
      });
      TestBed.compileComponents();
    })
  );
  it('should send credentials on submit', () => {
    const fixture = TestBed.createComponent(SiteComponent);
    const component: SiteComponent = fixture.componentInstance;
    const element = fixture.nativeElement;
    const expectedEmail = 'test@gmail.com';
    const expectedPassword = 'abc123';

    fixture.detectChanges();

    expect(element.querySelector('#login-email').value).toEqual(expectedEmail);

    element.querySelector('#login-password').value = expectedPassword;
    element.querySelector('#login-password').dispatchEvent(new Event('input'));

    fixture.detectChanges();

    element.querySelector('button[type="submit"]').click();

    expect(component.storedEmail).toEqual(expectedEmail);
    expect(component.storedPassword).toEqual(expectedPassword);
  });
});
