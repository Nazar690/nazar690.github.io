import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SymbolModel } from '../../models';

import { StocksService } from '../../services/stocks.service';

@Component({
  selector: 'app-stock-layout',
  templateUrl: './stock-layout.component.html',
  styleUrls: ['./stock-layout.component.scss']
})
export class StockLayoutComponent implements OnInit {

  isLoading: boolean = false;
  search: FormControl = new FormControl<string>('');
  stocks: SymbolModel[] = [];

  get disabled() {
    return !this.search.value?.trim()?.length || this.isLoading;
  }

  constructor(private readonly stocksService: StocksService) { }

  ngOnInit() {
    this.stocks = this.stocksService.getStocks();
  }

  trackStocks() {
    this.isLoading = true;
    this.search.disable();

    this.stocksService.searchSymbol(this.search.value).subscribe(data => {
      if (!this.isDuplicate(this.stocks, data.result[0].symbol)) {
        this.addNewSymbol(this.stocks, data.result[0]);
      }

      this.isLoading = false;
      this.search.enable();
    });
  }

  isDuplicate(stocks: SymbolModel[], symbol: string) {
    return stocks.some(x => x.symbol.toUpperCase() === symbol.toUpperCase());
  }

  addNewSymbol(stocks: SymbolModel[], symbol: SymbolModel) {
    this.stocks = [...stocks, symbol];
    this.stocksService.saveStock(this.stocks);
  }
}
