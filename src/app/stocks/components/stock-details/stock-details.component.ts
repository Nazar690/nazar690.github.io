import { Subscription, switchMap } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { StocksService } from '../../services';
import { SymbolSentimentDetails } from '../../models/symbol-sentiment-details';

import { SymbolSentimentLookup } from '../../models/symbol-sentiment-lookup';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
  providers: [DatePipe]
})
export class StockDetailsComponent implements OnInit, OnDestroy {

  stocks: SymbolSentimentLookup = {} as SymbolSentimentLookup;
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
  ) { }

  ngOnInit() {
    const from = this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd');
    const to = this.datePipe.transform(this.dateTo, 'yyyy-MM-dd');

    this.subscription$.add(
      this.route.params.pipe(switchMap(params => {
        return this.stocksService.getSentiment(params['symbol'], from, to)
      })).subscribe(res => this.stocks = res)
    )
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  trackByFn(index: number) {
    return index;
  }
}
