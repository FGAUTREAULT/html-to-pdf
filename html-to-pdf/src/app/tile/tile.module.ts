import { NgModule } from '@angular/core';
import { TileComponent } from './tile.component';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MatCardModule,
    MatProgressBarModule,
    CommonModule
  ],
  declarations: [
    TileComponent
  ],
  exports: [
    TileComponent
  ],
  providers: [],
})
export class TileModule {
}
