import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'fipe-message-error',
  standalone: true,
  host: {
    '[style.width]': '"100%"',
    '[style.display]': '"inline-block"',
  },
  template: `<small class="text-danger my-2">{{ text() }}</small>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageErrorComponent {
  text = input<string>('Houve um erro');
}
