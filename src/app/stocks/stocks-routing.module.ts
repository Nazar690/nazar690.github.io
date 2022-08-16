import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockDetailsComponent, StockLayoutComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: StockLayoutComponent
  },
  {
    path: 'sentiment/:symbol',
    component: StockDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
