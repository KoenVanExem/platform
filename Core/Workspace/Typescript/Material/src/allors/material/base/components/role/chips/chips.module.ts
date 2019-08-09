import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AllorsFocusModule } from '../../../../../angular';

import { AllorsMaterialChipsComponent } from './chips.component';
export { AllorsMaterialChipsComponent } from './chips.component';

@NgModule({
  declarations: [
    AllorsMaterialChipsComponent,
  ],
  exports: [
    AllorsMaterialChipsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    AllorsFocusModule
  ],
})
export class AllorsMaterialChipsModule {}