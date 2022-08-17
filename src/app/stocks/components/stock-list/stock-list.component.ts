import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { combineLatest } from 'rxjs';

import { SymbolModel } from '../../models/symbol';
import { SymbolQuoteLookup } from '../../models/symbol-quote-lookup';
import { StocksService } from '../../services';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, OnChanges {

  @Input() stocks: SymbolModel[] = [];
  stockDetails: SymbolQuoteLookup[] = []

  constructor(private readonly stocksService: StocksService) { }

  ngOnInit() {
    const requests = this.stocks.map(x => this.stocksService.getQuote(x.symbol));

    combineLatest(requests).subscribe(res => {
      this.stockDetails = res.map((x, i) => ({ symbol: this.stocks[i], quote: x } as SymbolQuoteLookup));
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stocks'].currentValue.length) {
      const symbols = this.stocks.map(x => x.symbol);
      const newSymbol = (changes['stocks'].currentValue as SymbolModel[]).slice(-1)[0];
      // .find(x => !symbols.includes(x.symbol));

      this.stocksService.getQuote(newSymbol.symbol).subscribe(res => {
        this.stockDetails.push({ symbol: newSymbol, quote: res })
      })
    }
  }

  removeItem(symbol: string) {
    this.stocksService.removeStock(symbol);
    this.stocks = this.stocks.filter(x => x.symbol !== symbol);
    this.stockDetails = this.stockDetails.filter(x => x.symbol.symbol !== symbol);
  }
}
