import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

/**
 * CONCEPT 11a - TEMPLATE-DRIVEN forms.
 *
 * You build the form in HTML: `[(ngModel)]` binds a field, `required` and
 * friends are plain HTML attributes, and Angular creates the form model for you
 * behind the scenes.
 *
 * Good for: small, simple forms.
 * Not so good for: complex dynamic forms, or logic you want to unit-test
 * without a template.
 */
@Component({
  selector: 'app-template-form',
  imports: [FormsModule, JsonPipe],
  template: `
    <!-- #form="ngForm" exports the NgForm directive so we can inspect/submit it. -->
    <form #form="ngForm" (ngSubmit)="submit(form)" novalidate>
      <label class="field">
        <span>Full name *</span>
        <input
          type="text"
          name="name"
          [(ngModel)]="model.name"
          #nameRef="ngModel"
          required
          minlength="3"
        />
        <!-- The template asks the control whether it is invalid and touched. -->
        @if (nameRef.invalid && nameRef.touched) {
          <span class="error">
            @if (nameRef.errors?.['required']) { Name is required. }
            @if (nameRef.errors?.['minlength']) { At least 3 characters. }
          </span>
        }
      </label>

      <label class="field">
        <span>Email *</span>
        <input type="email" name="email" [(ngModel)]="model.email" #emailRef="ngModel" required email />
        @if (emailRef.invalid && emailRef.touched) {
          <span class="error">A valid email is required.</span>
        }
      </label>

      <label class="field">
        <span>Age (18+)</span>
        <input type="number" name="age" [(ngModel)]="model.age" #ageRef="ngModel" min="18" />
        @if (ageRef.invalid && ageRef.touched) {
          <span class="error">You must be at least 18.</span>
        }
      </label>

      <label class="field">
        <span>Plan</span>
        <select name="plan" [(ngModel)]="model.plan">
          <option value="free">Free</option>
          <option value="pro">Pro</option>
        </select>
      </label>

      <label class="field">
        <span><input type="checkbox" name="terms" [(ngModel)]="model.terms" style="width:auto" /> I accept the terms *</span>
        @if (!model.terms && form.submitted) {
          <span class="error">You must accept the terms.</span>
        }
      </label>

      <div class="row">
        <button class="primary" type="submit">Submit</button>
        <button type="button" (click)="reset(form)">Reset</button>
      </div>

      <dl class="kv" style="margin-top:.8rem">
        <dt>form.valid</dt><dd class="mono">{{ form.valid }}</dd>
        <dt>form.dirty</dt><dd class="mono">{{ form.dirty }}</dd>
        <dt>form.submitted</dt><dd class="mono">{{ form.submitted }}</dd>
      </dl>

      @if (submitted) {
        <div class="note">
          <strong>Submitted!</strong> <span class="mono">{{ submitted | json }}</span>
        </div>
      }
    </form>
  `,
})
export class TemplateFormComponent {
  model = { name: '', email: '', age: 18, plan: 'free', terms: false };
  submitted: unknown = null;

  submit(form: NgForm): void {
    // `form.invalid` is true when any control fails validation.
    if (form.invalid || !this.model.terms) {
      form.control.markAllAsTouched();
      return;
    }

    this.submitted = { ...this.model };
    form.resetForm({ plan: 'free', age: 18, terms: false });
  }

  reset(form: NgForm): void {
    form.resetForm({ name: '', email: '', age: 18, plan: 'free', terms: false });
    this.submitted = null;
  }
}
