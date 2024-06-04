import {FormControl} from '@angular/forms';

export interface Field {
  type: 'text' | 'number';
  key: string;
  hidden?: boolean;
}

export interface FieldWithControl extends Field {
  control: FormControl;
}

export interface Config {
  fields: Field[];
}
