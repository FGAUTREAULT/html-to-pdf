import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../store/data.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements AfterViewInit, OnDestroy {

  @ViewChild('chart') chartEl: ElementRef;
  chartData: BehaviorSubject<Chart>;
  timerange = 50;
  datasetsCount = 5;
  subscription: Subscription;

  constructor(
    private readonly dataService: DataService,
  ) {
    this.chartData = new BehaviorSubject(undefined);
  }

  ngAfterViewInit() {
    const chartCtx = this.chartEl.nativeElement.getContext('2d');
    this.subscription = this.dataService.getData(this.timerange, this.datasetsCount)
      .subscribe(config => this.chartData.next(new Chart(chartCtx, config)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
