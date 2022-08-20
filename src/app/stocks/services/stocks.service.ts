import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { SymbolQuote, SymbolLookupModel, SymbolModel } from '../models';
import { SymbolSentimentLookup } from '../models/symbol-sentiment-lookup';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  private baseUrl = `https://finnhub.io/api/v1/`;
  private token = `&token=${environment.apiKey}`;

  searchSymbol(search: string) {
    return this.http.get<SymbolLookupModel>(this.baseUrl + 'search?q=' + search + this.token);
  }

  getQuote(symbol: string) {
    return this.http.get<SymbolQuote>(this.baseUrl + 'quote?symbol=' + symbol + this.token);
  }

  getSentiment(symbol: string, from: string, to: string) {
    return this.http.get<SymbolSentimentLookup>(this.baseUrl + `stock/insider-sentiment?symbol=${symbol}&from=${from}&${to}&${this.token}`);
  }

  getStocks() {
    return JSON.parse(localStorage.getItem('stocks') || '[]') as SymbolModel[];
  }

  saveStock(stocks: SymbolModel[],) {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }

  removeStock(symbol: string) {
    let stocks = JSON.parse(localStorage.getItem('stocks') || '') as SymbolModel[];
    stocks = stocks.filter(x => x.symbol !== symbol);

    localStorage.setItem('stocks', JSON.stringify(stocks));
  }

}
