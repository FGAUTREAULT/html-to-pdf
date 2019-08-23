import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import * as format from 'date-format';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  format = 'yyyy-MM-ddThh:mm:ss.000+0200';

  private generateLabels(count: number) {
    const date = new Date();
    const result = Array(count).fill(1).map(delay => {
      date.setDate(date.getDate() + delay);
      return format.asString(this.format, date);
    });
    return result;
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private generateDatasets(count: number, timerange: number) {

    const datasets = Array(count).fill(0).map((dataset, index) => {
      const color = this.getRandomColor();
      return {
        type: 'bar',
        data: this.generateData(timerange),
        label: `Dataset ${index}`,
        fill: index === 0 ? 'origin' : '-1',
        backgroundColor: color,
        borderColor: color
      };
    });

    return datasets;
  }

  private generateData(size: number) {
    return Array(size).fill(1).map(data => data * Math.random() * 10000);
  }

  getData(timerange: number, datasetsCount: number): Observable<ChartConfiguration> {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.generateLabels(timerange),
        datasets: this.generateDatasets(datasetsCount, timerange),
      },
      options: {
        scales: {
          xAxes: [{
            type: "time",
            time: {
              unit: 'day',
              round: 'day',
              displayFormats: {
                day: 'MMM D'
              }
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
          }]
        }
      }
    };
    return of(config).pipe(
      delay(Math.random() * 5000)
    );
  }


}
