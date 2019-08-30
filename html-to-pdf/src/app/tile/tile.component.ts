import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, HostBinding, HostListener, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../store/data.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Context } from '../store/model';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { RoutingConstants, RoutingParamsConstants } from '../constants/app.constants';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements AfterViewInit, OnDestroy, OnInit {

  @Input() context: Context;
  @Input() id: number;
  @HostBinding('class.fullscreen') fullscreen: boolean;

  @ViewChild('chart') chartEl: ElementRef;
  chartData: BehaviorSubject<Chart>;
  subscriptions: Subscription[];
  @HostBinding('class.print') print: boolean;

  constructor(
    private readonly dataService: DataService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.subscriptions = [];
    this.chartData = new BehaviorSubject(undefined);
    this.fullscreen = false;
    this.print = false;
  }

  ngAfterViewInit() {
    const chartCtx = this.chartEl.nativeElement.getContext('2d');
    this.subscriptions.push(this.dataService.getData(this.context)
      .subscribe(config => this.chartData.next(new Chart(chartCtx, config))));
  }

  ngOnDestroy() {
    this.subscriptions.splice(0, this.subscriptions.length).forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => this.applyParams(params)));
    this.chartEl.nativeElement.addEventListener('click', this.onClick.bind(this));
  }

  onPrintPreview() {
    const extras: NavigationExtras = {
      queryParams: { [RoutingParamsConstants.APP_ROUTING_PARAM_PRINT]: true }
    };
    this.router.navigate([`${RoutingConstants.APP_NAVIGATE_DASHBOARD}/${this.id}`], extras);
  }

  private applyParams(params: Params) {
    const id = parseInt(params['id'], 2);
    if (id === this.id) {
      this.print = Boolean(this.route.snapshot.queryParams[RoutingParamsConstants.APP_ROUTING_PARAM_PRINT]) || false;
      const fullscreen = Boolean(this.route.snapshot.queryParams[RoutingParamsConstants.APP_ROUTING_PARAM_FULLSCREEN]) || false;
      this.fullscreen = this.print === true ? this.print : fullscreen;
    }
  }

  private onClick() {
    this.fullscreen = !this.fullscreen;
    this.print = false;
  }

}
