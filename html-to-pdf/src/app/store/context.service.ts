import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Context } from './model';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  public static readonly DEFAULT_CONTEXT: Context = {
    chartNumber: 4,
    timeRange: 30,
    datasetNumber: 2,
    delayMax: 2000,
  };

  private readonly _context$: BehaviorSubject<Context>;

  constructor() {
    this._context$ = new BehaviorSubject(ContextService.DEFAULT_CONTEXT);
  }

  getDefaultValues(): Context {
    return Object.assign({}, ContextService.DEFAULT_CONTEXT);
  }

  getValues(): Context {
    return this._context$.getValue();
  }

  setValues(context: Context) {
    this._context$.next(context);
  }

  getContextAsObservable(): Observable<Context> {
    return this._context$.asObservable();
  }

  toString(context: Context): string {
    return `${context.timeRange}-${context.datasetNumber}-${context.delayMax}`;
  }

}
