import { Component, signal } from '@angular/core';

interface CliCommand {
  command: string;
  summary: string;
  detail: string;
}

/**
 * CONCEPT 14 - THE ANGULAR CLI.
 *
 * What: `ng` is the command-line tool that creates, runs, tests and builds the
 *       app. It is not optional plumbing - it owns the build, and it is how you
 *       add code consistently.
 * Why:  `ng generate` writes files that follow the project's conventions
 *       (naming, folder, registration), so a team of ten produces one style
 *       instead of ten.
 */
@Component({
  selector: 'app-cli-demo',
  template: `
    <h1>14. Angular CLI</h1>
    <p class="lead">
      Everything in this repo was created by the CLI. Pick a command to see what it does.
    </p>

    <div class="panel">
      <h2>Command reference</h2>
      <div class="pill-list" style="margin-bottom:.8rem">
        @for (item of commands; track item.command) {
          <button
            class="pill"
            [class.primary]="selected().command === item.command"
            (click)="selected.set(item)"
          >
            {{ item.command }}
          </button>
        }
      </div>

      <div class="panel panel--soft" style="margin:0">
        <h3 class="mono" style="margin:0">{{ selected().command }}</h3>
        <p style="margin:.4rem 0 0">{{ selected().summary }}</p>
        <p class="muted" style="margin:.4rem 0 0;font-size:.9rem">{{ selected().detail }}</p>
      </div>
    </div>

    <div class="panel">
      <h2>Everyday commands</h2>
      <pre class="code">npm install -g &#64;angular/cli        # install the CLI globally (or use npx)

ng new my-app --style=scss         # create a workspace
ng serve                           # dev server with live reload (--open, --port)
ng build                           # production build into dist/
ng build --watch                   # rebuild on change

ng generate component features/hero          # or: ng g c features/hero
ng generate service core/auth                # or: ng g s core/auth
ng generate guard core/auth                  # or: ng g g core/auth
ng generate pipe shared/initials
ng generate directive shared/highlight
ng generate module features/admin --routing

ng test                            # unit tests (Karma/Jasmine by default)
ng e2e                             # end-to-end tests
ng add &#64;angular/pwa                # install + wire a library automatically
ng update                          # upgrade Angular itself
ng lint                            # static analysis</pre>
      <div class="note">
        <code class="inline">ng generate</code> also updates the places a file must be registered.
        That is the real value - not the typing it saves, but the wiring it never forgets.
      </div>
    </div>

    <div class="panel">
      <h2>Files the CLI owns</h2>
      <table class="grid">
        <thead><tr><th>File</th><th>What it configures</th></tr></thead>
        <tbody>
          <tr><td class="mono">angular.json</td><td>Build/serve/test targets, budgets, assets, styles</td></tr>
          <tr><td class="mono">tsconfig.json</td><td>TypeScript strictness and module settings</td></tr>
          <tr><td class="mono">package.json</td><td>Dependencies and the npm scripts (<code class="inline">start</code>, <code class="inline">build</code>, <code class="inline">test</code>)</td></tr>
          <tr><td class="mono">.editorconfig</td><td>Formatting rules the generator follows</td></tr>
        </tbody>
      </table>
    </div>

    <div class="panel">
      <h2>This project</h2>
      <pre class="code">ng new AngularConceptsPlayground --style=scss   # created this workspace
npm start                                       # what you are running now
npm run build                                   # verifies it compiles for production</pre>
      <div class="note note--warn">
        <strong>Budgets are your friend.</strong> <code class="inline">angular.json</code> fails the
        build when the initial bundle crosses a size limit. It is the cheapest guard against a
        slow app creeping in one import at a time.
      </div>
    </div>
    <div class="panel panel--interview">
      <h2>In an interview</h2>
      <ul class="tight">
        <li>The CLI owns the build: ng serve, ng build, ng test, ng update, ng add. It is not optional plumbing.</li>
        <li>ng generate writes files that follow the project conventions and registers them where needed. That consistency across a team is the real value, not the typing it saves.</li>
        <li>ng add runs a library's schematic, so the dependency, the providers and the config are wired in one step.</li>
        <li>ng update applies the official migrations - which is how you move between major versions safely rather than by hand.</li>
        <li>angular.json is where the build, assets, budgets and environments are configured; it is worth knowing your way around it.</li>
      </ul>
    </div>
  `,
})
export class CliDemoComponent {
  readonly commands: CliCommand[] = [
    {
      command: 'ng new',
      summary: 'Create a new workspace and application.',
      detail: 'Scaffolds the folder structure, installs dependencies, and writes angular.json, tsconfig.json and the first component. Flags like --style, --routing and --ssr decide what it generates.',
    },
    {
      command: 'ng serve',
      summary: 'Run a development server with live reload.',
      detail: 'Rebuilds in memory and refreshes the browser on save. --open launches the browser, --port changes the port, --host exposes it on your network.',
    },
    {
      command: 'ng build',
      summary: 'Compile the app for production into dist/.',
      detail: 'Enables optimisation, minification, tree-shaking and hashed filenames, and reports bundle sizes against the budgets in angular.json.',
    },
    {
      command: 'ng generate',
      summary: 'Create a component, service, guard, pipe, directive or module.',
      detail: 'Writes the files AND registers them where needed. This is the command that keeps a codebase consistent across a whole team.',
    },
    {
      command: 'ng test',
      summary: 'Run unit tests.',
      detail: 'Runs the specs (*.spec.ts) through Karma/Jasmine by default. The CLI generated a spec next to every component it made.',
    },
    {
      command: 'ng add',
      summary: 'Install a library and configure it in one step.',
      detail: 'Runs the library\'s schematic, which can add dependencies, providers and files. ng add @angular/material, ng add @angular/pwa, and so on.',
    },
    {
      command: 'ng update',
      summary: 'Upgrade Angular and its dependencies.',
      detail: 'Applies the official migrations so breaking changes are handled for you. This is how you move between major versions safely.',
    },
  ];

  readonly selected = signal<CliCommand>(this.commands[0]);
}
