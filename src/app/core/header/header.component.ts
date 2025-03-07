import { Component } from '@angular/core';

@Component({
  selector: 'fipe-header',
  template: `
    <header class="bg-dark py-4">
      <div class="container">
        <span class="text-center mb-4 text-white">VH - Fipe</span>
      </div>
    </header>
  `,
  standalone: true,
})
export class HeaderComponent {}
