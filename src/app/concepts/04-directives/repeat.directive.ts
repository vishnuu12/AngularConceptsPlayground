import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

/** The data each repeated copy of the template can read. */
export interface RepeatContext {
  /** `let i` binds to this. */
  $implicit: number;
  /** `let idx="index"` binds to this. */
  index: number;
}

/**
 * CONCEPT 4d - a CUSTOM STRUCTURAL directive.
 *
 * A structural directive adds or removes elements from the DOM. It does that by
 * taking a <ng-template> and stamping copies of it into a ViewContainerRef.
 *
 * `*appRepeat="3"` is sugar for:
 *     <ng-template [appRepeat]="3"> ... </ng-template>
 * and this directive renders that template three times. This is exactly how
 * *ngFor works under the hood - writing it yourself is the fastest way to
 * understand what the asterisk is really doing.
 */
@Directive({
  selector: '[appRepeat]',
  standalone: true,
})
export class RepeatDirective {
  // inject() is the modern way to get dependencies in a directive/component.
  private readonly template = inject<TemplateRef<RepeatContext>>(TemplateRef);
  private readonly container = inject(ViewContainerRef);

  @Input() set appRepeat(count: number) {
    this.container.clear();
    for (let i = 0; i < Math.max(0, count); i++) {
      // Each embedded view gets its own context object.
      this.container.createEmbeddedView(this.template, { $implicit: i, index: i });
    }
  }
}
