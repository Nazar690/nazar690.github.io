import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Stock, SymbolLookupModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  private baseUrl = `https://finnhub.io/api/v1/`;
  private token = `&token=${environment.apiKey}`;

  searchAssets(search: string) {
    return this.http.get<SymbolLookupModel>(this.baseUrl + 'search?q=' + search + this.token);
  }

  getQuote(symbol: string) {
    return this.http.get(this.baseUrl + 'quote?symbol=' + symbol + this.token);
  }

  getSentiment(symbol: string, from: string | null, to: string | null) {
    return this.http.get(this.baseUrl + `stock/insider-sentiment?symbol=${symbol }&from=${from}&${to}&${this.token}`);
  }

  saveStock(stock: Stock) {
    localStorage.setItem('t', JSON.stringify(stock));
  }

  removeStock(stock: Stock) {
    localStorage.removeItem('t');
  }

}
