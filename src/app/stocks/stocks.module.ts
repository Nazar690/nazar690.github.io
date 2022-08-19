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
} from './components';

import { MonthPipe } from './pipes/month.pipe';

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

    MonthPipe
  ]
})
export class StocksModule { }
