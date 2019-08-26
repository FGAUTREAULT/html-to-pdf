import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../store/data.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Context } from '../store/model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements AfterViewInit, OnDestroy {

  @Input() context: Context;

  @ViewChild('chart') chartEl: ElementRef;
  chartData: BehaviorSubject<Chart>;
  subscription: Subscription;

  constructor(
    private readonly dataService: DataService,
  ) {
    this.chartData = new BehaviorSubject(undefined);
  }

  ngAfterViewInit() {
    const chartCtx = this.chartEl.nativeElement.getContext('2d');
    this.subscription = this.dataService.getData(this.context)
      .subscribe(config => this.chartData.next(new Chart(chartCtx, config)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
