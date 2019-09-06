import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material';
import { TileModule } from '../tile/tile.module';
import { CommonModule } from '@angular/common';
import { DashboardPrintComponent } from './dashboard-print/dashboard-print.component';

@NgModule({
  imports: [
    TileModule,
    MatGridListModule,
    DashboardRoutingModule,
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    DashboardPrintComponent,
  ],
  providers: [],
})
export class DashboardModule {
}
