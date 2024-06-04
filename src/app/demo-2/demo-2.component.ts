import {Component, signal} from '@angular/core';
import {Config} from './dynamic-form/config';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-demo-2',
  standalone: true,
  imports: [
    DynamicFormComponent
  ],
  templateUrl: './demo-2.component.html',
  styleUrl: './demo-2.component.scss'
})
export class Demo2Component {
  config = signal<Config>({
    fields: [{type: 'text', key: 'firstname'}, {type: 'text', key: 'lastname'}, {type: 'number', key: 'age'}],
  });

  toggle() {
    this.config.update((value) => {
      value.fields[1].hidden = !value.fields[1].hidden;
      return {...value};
    })
  }
}
