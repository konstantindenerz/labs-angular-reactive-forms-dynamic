import {FormControl} from '@angular/forms';

export interface Group {
  fields: Field[];
}

export interface Field {
  type: 'text' | 'number' | 'groups';
  key: string;
  hidden?: boolean;
  groups?: Group[];
}

export interface GroupWithControls extends Group {
  fields: FieldWithControl[];
}

export interface FieldWithControl extends Field {
  control: FormControl;
  groups?: GroupWithControls[];
}

export interface Config {
  fields: Field[];
}
