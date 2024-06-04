import {Component} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-date-time-range-picker',
  standalone: true,
  imports: [],
  templateUrl: './date-time-range-picker.component.html',
  styleUrl: './date-time-range-picker.component.scss',
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: DateTimeRangePickerComponent, multi: true}]
})
export class DateTimeRangePickerComponent implements ControlValueAccessor {
  isoDate?: string;
  dateText?: string;
  onChange = (value: string) => {};

  writeValue(obj: any): void {
    this.isoDate = obj;
    if (obj !== undefined) {
      this.dateText = new Date(obj).toLocaleDateString('de-DE');
      console.log(this.dateText);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    // throw new Error('Method not implemented.');
  }

  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  next() {
    const date = new Date(this.isoDate ?? new Date());
    date.setDate(date.getDate() + 1);
    this.dateText = date.toLocaleDateString('de-DE');
    this.onChange(this.isoDate = date.toISOString());
  }
}
