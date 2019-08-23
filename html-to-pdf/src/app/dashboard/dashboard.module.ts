import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material';
import { TileModule } from '../tile/tile.module';

@NgModule({
  imports: [
    TileModule,
    MatGridListModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [],
})
export class DashboardModule {
}
