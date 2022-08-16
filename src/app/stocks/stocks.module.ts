import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StocksRoutingModule } from './stocks-routing.module';

import {
  StockCardComponent,
  StockDetailsComponent,
  StockLayoutComponent,
  StockListComponent,
  StockSearchComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StocksRoutingModule
  ],
  declarations: [
    StockCardComponent,
    StockDetailsComponent,
    StockLayoutComponent,
    StockListComponent,
    StockSearchComponent
  ]
})
export class StocksModule { }
