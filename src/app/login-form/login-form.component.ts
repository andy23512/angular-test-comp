import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.pug',
  styleUrls: ['./login-form.component.styl']
})
export class LoginFormComponent implements OnChanges {
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  @Input() email: string;

  @Output() submitted = new EventEmitter();

  ngOnChanges(change) {
    if (change.email) {
      this.loginForm.controls['email'].setValue(change.email.currentValue);
    }
  }

  onSubmit({ email, password }) {
    this.submitted.emit({ email, password });
  }
}
