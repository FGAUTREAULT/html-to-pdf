import { Component, OnInit } from '@angular/core';
import { ContextService } from '../store/context.service';
import { Observable } from 'rxjs';
import { Context } from '../store/model';
import { ActivatedRoute } from '@angular/router';
import { RoutingParamsConstants } from '../constants/app.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  context$: Observable<Context>;
  print = false;

  constructor(
    private readonly contextService: ContextService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.context$ = this.contextService.getContextAsObservable();
    this.route.queryParams.subscribe(queryParams => {
      this.print = Boolean(queryParams[RoutingParamsConstants.APP_ROUTING_PARAM_PRINT]) || false;
    });
  }

  getSimpleArray(context: Context): Array<string> {
    return Array(context.chartNumber).fill(0).map((value) => this.contextService.toString(context));
  }
}
