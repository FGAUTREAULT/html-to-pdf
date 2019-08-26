import { Component, OnInit } from '@angular/core';
import { ContextService } from '../store/context.service';
import { Observable } from 'rxjs';
import { Context } from '../store/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  context$: Observable<Context>;

  constructor(
    private readonly contextService: ContextService
  ) { }

  ngOnInit() {
    this.context$ = this.contextService.getContextAsObservable();
  }

  getSimpleArray(context: Context): Array<string> {
    return Array(context.chartNumber).fill(0).map((value) => this.contextService.toString(context));
  }

}
