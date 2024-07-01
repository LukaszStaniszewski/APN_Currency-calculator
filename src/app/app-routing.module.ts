import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CurrencyCalculatorComponent} from "./domains/currency-calculator/currency-calculator.component";

const routes: Routes = [
  {
    path: '',
    component: CurrencyCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
