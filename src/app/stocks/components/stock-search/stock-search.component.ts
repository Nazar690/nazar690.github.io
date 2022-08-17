import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StocksService } from '../../services/stocks.service';
import { SymbolModel } from '../../models';
import { SymbolQuoteLookup } from '../../models/symbol-quote-lookup';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {

  search: FormControl;
  isLoading: boolean;
  stockSymbol: SymbolModel = {} as SymbolModel;
  stocks: SymbolModel[] = [];
  stockInfo: SymbolQuoteLookup = {} as SymbolQuoteLookup;

  get disabled() {
    return !this.search.value?.trim()?.length || this.isLoading;
  }

  constructor(private readonly stocksService: StocksService) {
    this.search = new FormControl<string>('');
    this.isLoading = false;
  }

  ngOnInit() {
    this.stocks = JSON.parse(localStorage.getItem('stocks') || '[]');
  }

  trackStocks() {
    this.isLoading = true;
    const value = this.search.value;

    const stocks = JSON.parse(localStorage.getItem('stocks') || '[]');

    this.search.disable();

    this.stocksService.searchSymbol(value)
      .subscribe(data => {
        this.stockSymbol = data.result[0];
        this.stocks = [...stocks, this.stockSymbol];
        this.stocksService.saveStock(this.stocks);
        this.isLoading = false;
        this.search.enable();
      });
  }

}
