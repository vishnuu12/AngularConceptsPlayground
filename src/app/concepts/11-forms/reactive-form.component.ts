import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forbiddenNameValidator, passwordsMatchValidator } from './custom.validators';

/**
 * CONCEPT 11b - REACTIVE forms.
 *
 * You build the form model in the CLASS with code, and the template just binds
 * to it. That means:
 *   - the shape and the rules are typed and testable without a template
 *   - you can add, remove and reconfigure controls at runtime
 *   - every change is a value you can subscribe to (valueChanges)
 *
 * Good for: anything with real logic. This is the default choice in most apps.
 */
@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <label class="field">
        <span>Full name *</span>
        <input type="text" formControlName="name" />
        @if (showError('name')) {
          <span class="error">
            @if (form.controls.name.errors?.['required']) { Name is required. }
            @if (form.controls.name.errors?.['minlength']) { At least 3 characters. }
          </span>
        }
      </label>

      <label class="field">
        <span>Username * (try "admin" or "root")</span>
        <input type="text" formControlName="username" />
        @if (showError('username')) {
          <span class="error">
            @if (form.controls.username.errors?.['required']) { Username is required. }
            @if (form.controls.username.errors?.['forbiddenName']) { That username is taken. }
          </span>
        }
      </label>

      <label class="field">
        <span>Email *</span>
        <input type="email" formControlName="email" />
        @if (showError('email')) {
          <span class="error">A valid email is required.</span>
        }
      </label>

      <div class="row" style="align-items:flex-start">
        <label class="field" style="flex:1">
          <span>Password *</span>
          <input type="password" formControlName="password" />
        </label>
        <label class="field" style="flex:1">
          <span>Confirm password *</span>
          <input type="password" formControlName="confirmPassword" />
        </label>
      </div>
      @if (form.errors?.['passwordsMismatch'] && form.controls.confirmPassword.touched) {
        <span class="error">The two passwords do not match.</span>
      }

      <!-- A FormArray: a list of controls the user can grow and shrink. -->
      <fieldset style="border:1px solid var(--border);border-radius:8px;padding:.6rem .8rem;margin:.6rem 0">
        <legend class="muted" style="font-size:.8rem">Skills (FormArray)</legend>
        <div formArrayName="skills">
          @for (skill of skills.controls; track $index; let i = $index) {
            <div class="row" style="margin-bottom:.4rem">
              <input type="text" [formControlName]="i" style="flex:1" />
              <button type="button" (click)="removeSkill(i)" [disabled]="skills.length === 1">Remove</button>
            </div>
          }
        </div>
        <button type="button" (click)="addSkill()">Add a skill</button>
      </fieldset>

      <div class="row">
        <button class="primary" type="submit" [disabled]="form.invalid">Submit</button>
        <button type="button" (click)="fillValid()">Fill valid data</button>
      </div>

      <dl class="kv" style="margin-top:.8rem">
        <dt>form.valid</dt><dd class="mono">{{ form.valid }}</dd>
        <dt>form.value</dt><dd class="mono">{{ form.value | json }}</dd>
      </dl>

      @if (submitted) {
        <div class="note"><strong>Submitted!</strong> <span class="mono">{{ submitted | json }}</span></div>
      }
    </form>
  `,
})
export class ReactiveFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, forbiddenNameValidator(['admin', 'root', 'superuser'])]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      skills: this.fb.nonNullable.array([this.fb.nonNullable.control('')]),
    },
    // Group-level validator, because it needs to compare two controls.
    { validators: passwordsMatchValidator },
  );

  submitted: unknown = null;

  /** The FormArray, with a getter so the template can read `.controls` and `.length`. */
  get skills(): FormArray {
    return this.form.controls.skills;
  }

  /** Show an error only once the user has actually touched the field. */
  showError(controlName: 'name' | 'username' | 'email'): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && control.touched;
  }

  addSkill(): void {
    this.skills.push(this.fb.nonNullable.control(''));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  fillValid(): void {
    this.form.setValue({
      name: 'Vishnu Saravanan',
      username: 'vishnu',
      email: 'vishnu@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
      skills: ['TypeScript', 'Angular'],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = this.form.getRawValue();
  }
}
