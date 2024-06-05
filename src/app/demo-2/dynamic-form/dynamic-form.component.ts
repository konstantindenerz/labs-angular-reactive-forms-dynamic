import {Component, computed, effect, input} from '@angular/core';
import {FormArray, FormControl, ReactiveFormsModule, UntypedFormArray, UntypedFormGroup} from '@angular/forms';
import {StatusComponent} from '../../status/status.component';
import {Config, FieldWithControl, GroupWithControls} from './config';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StatusComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  config = input.required<Config>({});
  fields = computed(() => this.config().fields.filter(({hidden}) => !hidden).map(field => ({
    ...field,
    control: new FormControl(field.key),
    groups: !!field.groups ? field.groups.map(group => ({
      fields: group.fields.map(groupField => ({
        ...groupField,
        control: new FormControl(groupField.key),
      }))
    } as GroupWithControls)) : undefined,
  } as FieldWithControl)));
  formGroup?: UntypedFormGroup;

  constructor() {
    effect(() => {
      console.log('update')
      const formGroup = new UntypedFormGroup({});

      this.fields().forEach(field => {
        if (!!field.groups) {
          const formArray = new UntypedFormArray([]);
          field.groups.forEach(group => {
            const childFormGroup = new UntypedFormGroup({});
            group.fields.forEach(childField => {
              childFormGroup.addControl(childField.key, childField.control);
            });
            formArray.push(childFormGroup);
          });
          formGroup.addControl(field.key, formArray);
        } else {
          formGroup.addControl(field.key, field.control);
        }
      });
      this.formGroup = formGroup;
    });
  }

  addRow(field: FieldWithControl): void {
    if (!field.groups) {
      return;
    }
    const formArray = this.formGroup?.get(field.key) as FormArray;
    field.groups.forEach(group => {
      const childFormGroup = new UntypedFormGroup({});
      group.fields.forEach(childField => {
        childFormGroup.addControl(childField.key, childField.control);
      });
      formArray.push(childFormGroup);
    });
    const [first]= field.groups;
    field.groups.push(first);
  }
}
