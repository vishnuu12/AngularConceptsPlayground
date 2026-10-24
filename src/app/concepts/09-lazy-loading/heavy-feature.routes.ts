import { Routes } from '@angular/router';

/**
 * CONCEPT 9c - the lazy feature's own route table.
 *
 * The root routes point at this file with
 *     loadChildren: () => import('./heavy-feature.routes').then(m => m.HEAVY_FEATURE_ROUTES)
 * so this file - and the component it pulls in - is a separate chunk.
 */
export const HEAVY_FEATURE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./heavy-widget.component').then((m) => m.HeavyWidgetComponent),
  },
];
