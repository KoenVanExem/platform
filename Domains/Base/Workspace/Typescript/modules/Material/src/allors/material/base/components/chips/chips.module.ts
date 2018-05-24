import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule, MatChipsModule, MatIconModule, MatInputModule } from '@angular/material';

import { ChipsComponent } from './chips.component';
import { FlexLayoutModule } from '@angular/flex-layout';
export { ChipsComponent } from './chips.component';

@NgModule({
  declarations: [
    ChipsComponent,
  ],
  exports: [
    ChipsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class ChipsModule {}