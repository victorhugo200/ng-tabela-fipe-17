import { Component, inject } from '@angular/core';
import { ActualYearService } from '../../shared/services/actual-year/actual-year.service';

@Component({
  selector: 'fipe-footer',
  standalone: true,
  template: `
    <footer class="bg-dark py-3">
      <div class="text-center">
        <span class="text-white "
          >© {{ actualYearService.getYear() }} Todos os direitos reservados | Desenvolvido por Victor
          Hugo.</span
        >
      </div>
    </footer>
  `,
  styles: [`
    :host {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    `]
})
export class FooterComponent {
  actualYearService = inject(ActualYearService);
}
