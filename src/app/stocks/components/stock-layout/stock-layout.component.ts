import { combineLatest, switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SymbolModel, SymbolQuoteLookup } from '../../models';

import { StocksService } from '../../services';

@Component({
  selector: 'app-stock-layout',
  templateUrl: './stock-layout.component.html',
  styleUrls: ['./stock-layout.component.scss']
})
export class StockLayoutComponent implements OnInit {

  isLoading: boolean = false;
  search: FormControl = new FormControl<string>('');
  stocksQuotes: SymbolQuoteLookup[] = []

  get disabled() {
    return !this.search.value?.trim()?.length || this.isLoading;
  }

  constructor(private readonly stocksService: StocksService) { }

  ngOnInit() {
    this.getStocksQuote();
  }

  getStocksQuote() {
    const stocks = this.stocksService.getStocks();

    if (!stocks.length) {
      return;
    }

    const requests = stocks.map(x => this.stocksService.getQuote(x.symbol));

    combineLatest(requests).subscribe(res => {
      this.stocksQuotes = res.map((x, i) => ({ symbol: stocks[i], quote: x }));
    });
  }

  trackStocks() {
    this.isLoading = true;
    this.search.disable();

    let newSymbol: SymbolModel;
    const stocks = this.stocksService.getStocks();

    this.stocksService.searchSymbol(this.search.value)
      .pipe(switchMap(data => {
        newSymbol = data.result[0];
        return this.stocksService.getQuote(newSymbol.symbol);
      }))
      .subscribe(quote => {
        if (!this.isDuplicate(stocks, newSymbol.symbol)) {
          this.addNewSymbol(stocks, newSymbol);
          this.stocksQuotes = [...this.stocksQuotes, { symbol: newSymbol, quote }];
        }

        this.isLoading = false;
        this.search.enable();
      });
  }

  isDuplicate(stocks: SymbolModel[], symbol: string) {
    return stocks.some(x => x.symbol.toUpperCase() === symbol.toUpperCase());
  }

  addNewSymbol(stocks: SymbolModel[], symbol: SymbolModel) {
    const newStocks = [...stocks, symbol];
    this.stocksService.saveStock(newStocks);
  }
}
