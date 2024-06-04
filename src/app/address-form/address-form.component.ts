import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit, OnDestroy {
  key = input.required<string>();
  parentFormGroup = inject(FormGroupDirective, {optional: true});
  private readonly formBuilder = inject(FormBuilder);
  group = this.formBuilder.group({
    street: ['', Validators.required],
    no: [42],
    zip: ['12345'],
    state: ['Barstate'],
  })

  ngOnInit(): void {
    this.parentFormGroup?.form.addControl(this.key(), this.group);
  }

  ngOnDestroy(){
    this.parentFormGroup?.form.removeControl(this.key());
  }
}
