import { Subscription, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksService } from '../../services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
  providers: [DatePipe]
})
export class StockDetailsComponent implements OnInit {

  stocks: any;
  subscription$ = new Subscription();
  dateFrom = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 2,
    new Date().getDate());

  dateTo = new Date();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly stocksService: StocksService,
    private readonly datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    const from = this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd');
    const to = this.datePipe.transform(this.dateTo, 'yyyy-MM-dd');

    console.log(from)

    this.subscription$.add(
      this.route.params.pipe(switchMap(params => {
        const symbol = params['symbol'];
        return this.stocksService.getSentiment(symbol, from, to)
      })).subscribe(res => {
        this.stocks = res;
      })
    )
  }

}
