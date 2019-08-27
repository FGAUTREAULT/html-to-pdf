import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, HostBinding, HostListener, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../store/data.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Context } from '../store/model';
import { ActivatedRoute, Params } from '@angular/router';

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
  print: boolean;

  constructor(
    private readonly dataService: DataService,
    private readonly route: ActivatedRoute,
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
  }

  @HostListener('click')
  onclick() {
    this.fullscreen = !this.fullscreen;
    this.print = false;
  }

  private applyParams(params: Params) {
    const id = parseInt(params['id']);
    if (id === this.id) {
      this.print = Boolean(this.route.snapshot.queryParams['print']) || false;
      this.fullscreen = this.print === true ? this.print : Boolean(this.route.snapshot.queryParams['fullscreen']) || false;
    }
  }

}
