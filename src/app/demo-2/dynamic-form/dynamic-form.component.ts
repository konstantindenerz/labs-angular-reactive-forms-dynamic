import {Component, computed, effect, input} from '@angular/core';
import {FormControl, ReactiveFormsModule, UntypedFormGroup} from '@angular/forms';
import {Config, FieldWithControl} from './config';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  config = input.required<Config>({});
  fields = computed(() => this.config().fields.filter(({hidden}) => !hidden).map(field => ({
    ...field,
    control: new FormControl(field.key)
  } as FieldWithControl)));
  formGroup?: UntypedFormGroup;

  constructor() {
    effect(() => {
      console.log('update')
      const formGroup = new UntypedFormGroup({});
      this.formGroup = formGroup;
      this.fields().forEach(field => formGroup.addControl(field.key, field.control));
    })
  }
}
