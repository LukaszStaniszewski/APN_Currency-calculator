import {FormControl, FormGroup} from "@angular/forms";

export type CalculatorFormGroup = FormGroup<{
  baseCurrency: CurrencyFormGroup
  targetCurrency: CurrencyFormGroup
}>

export type CurrencyFormGroup = FormGroup<{
  rate: FormControl<Rate>,
  amount: FormControl<number>
}>

export type Rate = {
  code: string,
  mid: number
}

export type ForeignCurrencyRatesDto = {
  table: string,
  no: string,
  effectiveDate: string,
  rates: ForeignCurrencyRate[]
}

export type ForeignCurrencyRate = {
  currency: string,
  code: string,
  mid: number
}
