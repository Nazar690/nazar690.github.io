import { forkJoin, switchMap, Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SymbolQuote, SymbolModel, SymbolQuoteLookup } from '../../models';

import { StocksService } from '../../services';

@Component({
  selector: 'app-stock-layout',
  templateUrl: './stock-layout.component.html',
  styleUrls: ['./stock-layout.component.scss']
})
export class StockLayoutComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  search: FormControl = new FormControl<string>('');
  stocksQuotes: SymbolQuoteLookup[] = []

  subscription$ = new Subscription();

  get disabled() {
    return !this.search.value?.trim()?.length || this.isLoading;
  }

  constructor(private readonly stocksService: StocksService) { }

  ngOnInit() {
    this.getStockQuotes();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  getStockQuotes() {
    const stocks = this.stocksService.getStocks();

    if (!stocks.length) {
      return;
    }

    const requests = stocks.reduce((acc, curr) => ({ ...acc, [curr.symbol]: this.stocksService.getQuote(curr.symbol) }), {});
    forkJoin(requests).subscribe(res => this.stocksQuotes = stocks.map(x => ({ symbol: x, quote: res[x.symbol] })))
  }

  trackStocks() {
    this.isLoading = true;
    this.search.disable();

    let newSymbol: SymbolModel;

    this.subscription$.add(
      this.stocksService.searchSymbol(this.search.value)
        .pipe(switchMap(data => {
          if (!data.result.length) {
            throw new Error();
          }

          newSymbol = data.result[0];
          return this.stocksService.getQuote(newSymbol.symbol);
        }))
        .subscribe({
          next: (quote => this.addNewSymbol(quote, newSymbol)),
          error: (() => this.handleError())
        })
    );
  }

  isDuplicate(stocks: SymbolModel[], symbol: string) {
    return stocks.some(x => x.symbol.toUpperCase() === symbol.toUpperCase());
  }

  addNewSymbol(quote: SymbolQuote, newSymbol: SymbolModel) {
    const stocks = this.stocksService.getStocks();

    if (!this.isDuplicate(stocks, newSymbol.symbol)) {
      const newStocks = [...stocks, newSymbol];
      this.stocksService.saveStock(newStocks);

      this.stocksQuotes = [...this.stocksQuotes, { symbol: newSymbol, quote }];
    }

    this.isLoading = false;
    this.search.enable();
  }

  handleError() {
    this.isLoading = false;
    this.search.enable();
  }
}
