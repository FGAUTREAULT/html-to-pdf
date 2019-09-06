import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardPrintComponent } from './dashboard-print/dashboard-print.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'print',
        component: DashboardPrintComponent,
      },
      {
        path: ':id',
        component: DashboardComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      }
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})

export class DashboardRoutingModule {
}
