import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WrapperComponent],
  exports: [WrapperComponent]
})
export class LayoutsModule {}
