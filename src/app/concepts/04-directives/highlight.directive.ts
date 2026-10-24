import { Directive, HostBinding, HostListener, Input } from '@angular/core';

/**
 * CONCEPT 4c - a CUSTOM ATTRIBUTE directive.
 *
 * An attribute directive changes the appearance or behaviour of the element it
 * sits on. It is just a class with @Directive and a selector in brackets.
 *
 * This one highlights the host element while the mouse is over it. Note that it
 * never touches the DOM directly - it sets a field and lets @HostBinding apply
 * it. That keeps the directive testable and lets Angular decide when to update.
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  /** The colour to use. `<p appHighlight="pink">` or `[appHighlight]="colour"`. */
  @Input('appHighlight') color = '#fde68a';

  /** @HostBinding writes to a property of the host element. */
  @HostBinding('style.backgroundColor') backgroundColor = '';
  @HostBinding('style.transition') transition = 'background-color .15s ease';
  @HostBinding('style.cursor') cursor = 'pointer';

  /** @HostListener subscribes to an event on the host element. */
  @HostListener('mouseenter') onMouseEnter(): void {
    this.backgroundColor = this.color;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.backgroundColor = '';
  }
}
