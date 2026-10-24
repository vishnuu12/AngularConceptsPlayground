import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

/**
 * CONCEPT 12b - the child, which reports every hook it runs.
 *
 * Order of the main hooks for a component the first time it appears:
 *     constructor -> ngOnChanges -> ngOnInit -> ngAfterContentInit
 *                 -> ngAfterViewInit -> ngAfterViewChecked
 * and on the way out: ngOnDestroy.
 *
 * `ngOnChanges` runs again every time an @Input value changes.
 */
@Component({
  selector: 'app-lifecycle-child',
  template: `
    <div class="panel panel--soft" style="margin:0">
      <strong>{{ label }}</strong>
      <p class="muted" style="margin:.25rem 0 0;font-size:.85rem">
        input value = <span class="mono">{{ value }}</span>
      </p>
    </div>
  `,
})
export class LifecycleChildComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() label = 'child';
  @Input() value = 0;
  @Output() logged = new EventEmitter<string>();

  constructor() {
    // The constructor runs first, but the inputs are NOT set yet.
    this.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // `changes['value']` - SimpleChanges is an index signature, so bracket access.
    const change = changes['value'];
    this.log(
      change
        ? `ngOnChanges  value: ${String(change.previousValue)} -> ${String(change.currentValue)}`
        : 'ngOnChanges',
    );
  }

  ngOnInit(): void {
    this.log('ngOnInit  (once - good place to load data)');
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit  (the view exists now)');
  }

  ngOnDestroy(): void {
    this.log('ngOnDestroy  (last chance to unsubscribe / clear timers)');
  }

  private log(message: string): void {
    this.logged.emit(message);
  }
}
