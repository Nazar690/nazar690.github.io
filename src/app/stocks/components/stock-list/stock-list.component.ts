import { Component, Input } from '@angular/core';

import { SymbolQuoteLookup } from '../../models';

import { StocksService } from '../../services';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent {

  @Input() stocks: SymbolQuoteLookup[] = [];

  constructor(private readonly stocksService: StocksService) { }

  removeItem(symbol: string, index: number) {
    this.stocksService.removeStock(symbol);
    this.stocks.splice(index, 1);
  }
}
