import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MatInputModule, MatSliderModule } from "@angular/material";

import { SliderComponent } from "./slider.component";
export { SliderComponent } from "./slider.component";

@NgModule({
  declarations: [
    SliderComponent,
  ],
  exports: [
    SliderComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatSliderModule,
  ],
})
export class SliderModule {
}