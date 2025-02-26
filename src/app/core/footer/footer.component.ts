import { Component } from '@angular/core';

@Component({
  selector: 'fipe-footer',
  standalone: true,
  template: `
    <footer class="bg-dark py-3">
      <div class="text-center">
        <span class="text-white "
          >© {{ year }} Todos os direitos reservados | Desenvolvido por Victor
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
  year = new Date().getFullYear();
}
