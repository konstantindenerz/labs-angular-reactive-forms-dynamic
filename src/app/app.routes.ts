import {Routes} from '@angular/router';
import {Demo1Component} from './demo-1/demo-1.component';
import {Demo2Component} from './demo-2/demo-2.component';

export const routes: Routes = [
  {path: 'demo-1', component: Demo1Component},
  {path: 'demo-2', component: Demo2Component},
  {path: '', pathMatch: 'full', redirectTo: 'demo-1'}
];
