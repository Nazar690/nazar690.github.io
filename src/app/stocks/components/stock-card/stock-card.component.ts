import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SymbolQuoteLookup } from '../../models/symbol-quote-lookup';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent {

  @Input() stock!: SymbolQuoteLookup;
  @Output() removeEvent = new EventEmitter<string>();

  removeItem() {
    this.removeEvent.emit(this.stock.symbol.symbol);
  }
}
