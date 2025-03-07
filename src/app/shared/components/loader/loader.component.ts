import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'fipe-loader',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[style.width]': '"100%"',
    '[style.display]': '"inline-block"',
  },
  template: `
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border"
        role="status"
        style="width: 3rem; height: 3rem"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `
})
export class LoaderComponent {}
