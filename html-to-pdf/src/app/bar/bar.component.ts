import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContextService } from '../store/context.service';
import { Context } from '../store/model';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { RoutingConstants, RoutingParamsConstants } from '../constants/app.constants';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  form: FormGroup;
  chartNumberControl: FormControl;
  timeRangeControl: FormControl;
  datasetNumberControl: FormControl;
  delayMaxControl: FormControl;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly contextService: ContextService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.onClickReset();
  }

  onClickDashboardPrint() {
    const print = this.route.snapshot.queryParams[RoutingParamsConstants.APP_ROUTING_PARAM_PRINT];
    const extras: NavigationExtras = {
      queryParams: {
        [RoutingParamsConstants.APP_ROUTING_PARAM_PRINT]: !print,
      },
    };
    if (!print) {
      this.router.navigate([`${RoutingConstants.APP_NAVIGATE_DASHBOARD}`], extras);
    } else {
      this.router.navigateByUrl(`${RoutingConstants.APP_NAVIGATE_DASHBOARD}`);
    }
  }

  onClickRun() {
    const context: Context = this.form.value;
    this.contextService.setValues(context);
  }

  onClickReset(context: Context = this.contextService.getDefaultValues()) {
    this.chartNumberControl = new FormControl(context.chartNumber, [Validators.required, Validators.min(1), Validators.max(20)]);
    this.timeRangeControl = new FormControl(context.timeRange, [Validators.required, Validators.min(1), Validators.max(250)]);
    this.datasetNumberControl = new FormControl(context.datasetNumber, [Validators.required, Validators.min(1), Validators.max(10)]);
    this.delayMaxControl = new FormControl(context.delayMax, [Validators.required, Validators.min(0), Validators.max(10000)]);
    this.form = this._fb.group({
      chartNumber: this.chartNumberControl,
      timeRange: this.timeRangeControl,
      datasetNumber: this.datasetNumberControl,
      delayMax: this.delayMaxControl,
    });
    this.contextService.setValues(context);
  }

}
