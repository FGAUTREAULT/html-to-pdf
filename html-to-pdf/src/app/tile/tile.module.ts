import { NgModule } from '@angular/core';
import { TileComponent } from './tile.component';
import { MatCardModule, MatProgressBarModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
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
