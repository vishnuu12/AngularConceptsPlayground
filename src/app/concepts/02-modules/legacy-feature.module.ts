import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ModulesDemoComponent } from './modules-demo.component';
import { LegacyWidgetComponent } from './widget.component';

/**
 * CONCEPT 2c - a real NgModule, lazily loaded by the router.
 *
 * The router reaches this through
 *     loadChildren: () => import('./...legacy-feature.module').then(m => m.LegacyFeatureModule)
 * so the whole chunk - this module, the page and the widget - is only fetched
 * when the user opens /modules.
 */

/** Child routes belonging to this feature. */
const routes: Routes = [
  { path: '', component: ModulesDemoComponent },
];

@NgModule({
  // Things that BELONG to this module. They are not standalone, so they must
  // be declared somewhere - and this is that somewhere.
  declarations: [ModulesDemoComponent, LegacyWidgetComponent],

  // What this module's declarations are allowed to use.
  imports: [
    CommonModule,                 // gives *ngIf, *ngFor, pipes like currency/date
    RouterModule.forChild(routes),// adds this feature's routes to the router
  ],

  // Nothing here needs to be visible outside the module, so nothing is exported.
  // (If another module imported this one and wanted <app-legacy-widget>, we
  //  would add `exports: [LegacyWidgetComponent]`.)
})
export class LegacyFeatureModule {}
