import { Pipe, PipeTransform } from '@angular/core';

/**
 * CONCEPT 5b - a CUSTOM pipe.
 *
 * A pipe takes a value in the template and transforms it for display:
 *
 *     {{ 'Vishnu Saravanan' | initials }}   ->  VS
 *
 * This one is a PURE pipe (the default). Angular calls it again only when the
 * input value changes, so it is cheap. An `impure: true` pipe runs on every
 * change-detection cycle - occasionally necessary, usually a performance bug.
 */
@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  /**
   * @param value the full name
   * @param max   how many initials to keep (default 2)
   */
  transform(value: string | null | undefined, max = 2): string {
    if (!value) {
      return '';
    }

    return value
      .trim()
      .split(/\s+/)
      .slice(0, max)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
}
