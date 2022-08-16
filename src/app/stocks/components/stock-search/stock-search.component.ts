import { switchMap } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StocksService } from '../../services/stocks.service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent implements OnInit {

  search: FormControl;
  isLoading: boolean;
  stockName: string;
  stocks: any;

  get disabled() {
    return !this.search.value?.trim()?.length || this.isLoading;
  }

  constructor(private readonly stocksService: StocksService) {
    this.search = new FormControl<string>('');
    this.isLoading = false;
    this.stockName = '';
  }

  ngOnInit() { }

  trackStocks() {
    this.isLoading = true;
    const value = this.search.value;

    this.search.disable();

    this.stocksService.searchAssets(value).pipe(switchMap(data => {
      this.stocks = data.result[0];
      return this.stocksService.getQuote(value)
    }))
    .subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.search.enable();
    });
  }

}
