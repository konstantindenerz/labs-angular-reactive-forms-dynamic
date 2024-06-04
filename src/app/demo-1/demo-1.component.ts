import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {AddressFormComponent} from '../address-form/address-form.component';
import {DateTimeRangePickerComponent} from '../date-time-range-picker/date-time-range-picker.component';
import {StatusComponent} from '../status/status.component';

interface Contract {
  id: string;
  name: string;
}

interface Request {
  title: string;
  date: string;
  contracts: Contract[];
}

export const containsFourtyTwo = (control: AbstractControl): ValidationErrors | null => {
  return control.value !== undefined && control.value.indexOf('42') === -1 ? {containsFourtyTwo: {message: 'text should contain 42'}} : null;
}


@Component({
  selector: 'app-demo-1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StatusComponent,
    DateTimeRangePickerComponent,
    AddressFormComponent
  ],
  templateUrl: './demo-1.component.html',
  styleUrl: './demo-1.component.scss'
})
export class Demo1Component {
  showChildForm = false;
  formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.group({
    title: ['test', [Validators.required, containsFourtyTwo]],
    date: [new Date().toISOString()],
  }, {asyncValidators: []});

  // formGroup = new FormGroup({
  //   title: new FormControl('default title 42', {validators: [Validators.required, containsFourtyTwo]}),
  //   date: new FormControl('')
  // })


  ngOnInit() {
    this.formGroup.valueChanges.subscribe((value) => {

      if (!this.formGroup.pending && this.formGroup.dirty && this.formGroup.valid) {
        console.log('📀 save ', value, value.date);
      }
    })


  }

  reset() {
    this.formGroup.reset({title: 'bubu'})
  }
}
