



import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import 'hammerjs';
@NgModule({
  imports:[MatFormFieldModule,MatDialogModule,MatRadioModule,MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,MatSnackBarModule],
  exports: [MatFormFieldModule,MatDialogModule,MatRadioModule,MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule,MatSnackBarModule]
  })

  export class MetirialModule{

  }
