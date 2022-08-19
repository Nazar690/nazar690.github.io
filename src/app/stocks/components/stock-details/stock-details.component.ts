import { Subscription, switchMap } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { StocksService } from '../../services';

import { SymbolModel } from '../../models';
import { CURRENT_DATE, THREE_MONTH_FROM_NOW } from '../../utils/constants';
import { SymbolSentimentLookup } from '../../models/symbol-sentiment-lookup';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss'],
  providers: [DatePipe]
})
export class StockDetailsComponent implements OnInit, OnDestroy {

  isLoading = true;
  symbol: SymbolModel = {} as SymbolModel;
  stocksDetails: SymbolSentimentLookup = {} as SymbolSentimentLookup;
  subscription$ = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly stocksService: StocksService,
    private readonly datePipe: DatePipe
  ) { }

  ngOnInit() {
    const dateFrom = this.datePipe.transform(THREE_MONTH_FROM_NOW, 'yyyy-MM-dd') || '';
    const dateTo = this.datePipe.transform(CURRENT_DATE, 'yyyy-MM-dd') || '';

    this.subscription$.add(
      this.route.params.pipe(switchMap(params => {
        const symbol = params['symbol'];

        this.symbol = this.stocksService.getStocks().find(x => x.symbol === symbol) || {} as SymbolModel;
        return this.stocksService.getSentiment(symbol, dateFrom, dateTo)
      })).subscribe(res => {
        this.stocksDetails = res;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  trackByFn(index: number) {
    return index;
  }
}
