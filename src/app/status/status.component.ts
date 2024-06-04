import {JsonPipe} from '@angular/common';
import {Component, input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  control = input.required<AbstractControl>();
}
