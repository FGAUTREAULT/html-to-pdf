import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContextService } from '../store/context.service';
import { Context } from '../store/model';

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
  ) { }

  ngOnInit() {
    const defaultValues = this.contextService.getValues();
    this.chartNumberControl = new FormControl(defaultValues.chartNumber, [Validators.required, Validators.min(1), Validators.max(20)]);
    this.timeRangeControl = new FormControl(defaultValues.timeRange, [Validators.required, Validators.min(1), Validators.max(250)]);
    this.datasetNumberControl = new FormControl(defaultValues.datasetNumber, [Validators.required, Validators.min(1), Validators.max(10)]);
    this.delayMaxControl = new FormControl(defaultValues.delayMax, [Validators.required, Validators.min(0), Validators.max(5000)]);
    this.form = this._fb.group({
      chartNumber: this.chartNumberControl,
      timeRange: this.timeRangeControl,
      datasetNumber: this.datasetNumberControl,
      delayMax: this.delayMaxControl,
    });
  }

  onClickTest() {
    const context: Context = this.form.value;
    this.contextService.setValues(context);
    console.error(context);
  }

}
