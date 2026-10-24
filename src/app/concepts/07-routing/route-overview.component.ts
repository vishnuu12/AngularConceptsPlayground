import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
}

/** The default child route: a list you can click through from. */
@Component({
  selector: 'app-route-overview',
  imports: [RouterLink],
  template: `
    <h3 style="margin-top:0">Overview (child route)</h3>
    <p class="muted">Pick a product to see the parameterised detail route.</p>
    <ul class="tight">
      @for (product of products; track product.id) {
        <li>
          <!-- Array form builds /routing/detail/:id, so the id is not string-concatenated. -->
          <a [routerLink]="['/routing/detail', product.id]" [queryParams]="{ from: 'list' }">
            {{ product.name }}
          </a>
          <span class="badge badge--info">{{ product.price }}</span>
        </li>
      }
    </ul>
  `,
})
export class RouteOverviewComponent {
  products: Product[] = [
    { id: 1, name: 'Mechanical keyboard', price: 7500 },
    { id: 2, name: 'Noise-cancelling headphones', price: 24000 },
    { id: 3, name: 'Standing desk', price: 32000 },
  ];
}
