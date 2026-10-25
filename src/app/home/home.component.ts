import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONCEPTS } from '../core/concepts';

/**
 * The landing page: a short explanation of what this playground is, plus a
 * card for every concept.
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="hero">
      <h1>Angular, one concept at a time</h1>
      <p>
        Fifteen small, self-contained demos - each one runs, each one is commented,
        and each one explains <em>why</em> the concept exists, not just how to type it.
        Open the sidebar, pick a concept, and read the source next to the demo.
      </p>
      <p style="margin-top:.6rem">
        Preparing for an interview? Every page now ends with an <em>In an interview</em> panel, and
        the whole playground is collected as question-and-answer on the
        <a routerLink="/interview" style="color:#7dd3fc">Interview prep</a> page.
      </p>
    </section>

    <div class="panel">
      <div class="panel__title">
        <span class="badge badge--accent">How to use this</span>
      </div>
      <ul class="tight">
        <li>Every page is a <strong>lazy-loaded</strong> route, so you can watch the network tab as you navigate.</li>
        <li>Source lives under <code class="inline">src/app/concepts/NN-*/</code>, numbered in the order below.</li>
        <li>Run it with <code class="inline">npm start</code>; build it with <code class="inline">npm run build</code>.</li>
        <li>Each page ends with the <em>why</em> (what breaks without it) and an <em>In an interview</em> panel.</li>
        <li>
          <a routerLink="/interview">Interview prep</a> gathers every concept into question and
          answer, filterable, in one place.
        </li>
      </ul>
    </div>

    <div class="cards">
      @for (concept of concepts; track concept.slug; let i = $index) {
        <a class="card" [routerLink]="['/', concept.slug]">
          <span class="badge badge--info">{{ i + 1 }}</span>
          <h3>{{ concept.title }}</h3>
          <p>{{ concept.blurb }}</p>
        </a>
      }

      <a class="card" routerLink="/interview">
        <span class="badge badge--warn">Q&amp;A</span>
        <h3>Interview prep</h3>
        <p>Every concept as question and answer, with the answers you would actually give.</p>
      </a>
    </div>
  `,
})
export class HomeComponent {
  readonly concepts = CONCEPTS;
}
