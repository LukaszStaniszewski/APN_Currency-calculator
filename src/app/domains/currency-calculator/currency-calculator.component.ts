import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CalculatorFormGroup, ForeignCurrencyRate, Rate} from "./currency-calculator.model";
import {Option, UiFieldSelectComponent} from "../../ui/ui-field-select/ui-field-select.component";
import {UiFieldNumberComponent} from "../../ui/ui-field-number/ui-field-number.component";
import {CurrencyCalculatorComponentApiService} from "./currency-calculator.component.api.service";
import {combineLatest, distinctUntilChanged, map, Observable, tap} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {isEqual} from "../../shared/utils/is-equal";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {UiButtonComponent} from "../../ui/ui-button/ui-button.component";

@Component({
  standalone: true,
  selector: 'app-test',
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['currency-calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    UiFieldSelectComponent,
    UiFieldNumberComponent,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    UiButtonComponent
  ],
  providers: [CurrencyCalculatorComponentApiService]
})
export class CurrencyCalculatorComponent implements OnInit {
  private readonly testComponentApiService = inject(CurrencyCalculatorComponentApiService);
  private readonly fb = inject(NonNullableFormBuilder)
  private readonly destroyRef = inject(DestroyRef);
  public form: CalculatorFormGroup = this.buildForm()
  public readonly currencyOptions$: Observable<Option<Rate>[]> = this.testComponentApiService.getForeignCurrencyRates().pipe(
    map(currencyRatesDto => currencyRatesDto[0]),
    map(({rates}) => this.mapCurrencyRatesToOptions(rates)),
    tap(options => this.setDefaultRates(options))
  )

  ngOnInit() {
    this.calculateTargetAmount()
    this.calculateBaseAmount();
  }

  private buildForm(): CalculatorFormGroup {
    return this.fb.group({
      baseCurrency: this.fb.group({
        rate: this.fb.control({code: '', mid: 0}),
        amount: this.fb.control(0)
      }),
      targetCurrency: this.fb.group({
        rate: this.fb.control({code: '', mid: 0}),
        amount: this.fb.control(0)
      }),
    })
  }


  private mapCurrencyRatesToOptions(currencyRates: ForeignCurrencyRate[]): Option<{ code: string, mid: number }>[] {
    return currencyRates.map(({currency, mid, code}) => ({value: {mid, code}, label: `${code} ${currency}`}))
  }

  private setDefaultRates(options: Option<Rate>[]) {
    const euro = this.getOptionByCode(options, 'EUR')
    const usd = this.getOptionByCode(options, 'USD')
    if (!euro || !usd) return
    this.baseCurrencyRateCtrl.setValue(euro)
    this.targetCurrencyRateCtrl.setValue(usd)
  }

  private getOptionByCode(options: Option<Rate>[], code: string) {
    return options.find(option => option.value.code === code)?.value
  }

  private calculateTargetAmount() {
    combineLatest([
      this.baseCurrencyFormGroup.valueChanges,
      this.targetCurrencyRateCtrl.valueChanges
    ])
      .pipe(takeUntilDestroyed(this.destroyRef), distinctUntilChanged(isEqual))
      .subscribe(([baseCurrency, targetCurrencyRate]) => {
        if (!targetCurrencyRate.mid || !baseCurrency.rate.mid) return
        this.targetCurrencyAmountCtrl.setValue(this.calculateCurrency(baseCurrency.amount!, baseCurrency.rate.mid, targetCurrencyRate.mid))
      })
  }

  private calculateBaseAmount() {
    this.targetCurrencyFormGroup.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      distinctUntilChanged(isEqual)).subscribe(value => {
      const test = this.baseCurrencyRateCtrl.value
      if (!test.mid || !value.rate.mid) return
      this.baseCurrencyAmountCtrl.setValue(this.calculateCurrency(value.amount!, value.rate.mid, test.mid))
    })
  }

  private calculateCurrency(baseAmount: number, baseRatio: number, targetRatio: number): number {
    return Math.round(((baseRatio / targetRatio) * baseAmount) * 1e3) / 1e3;
  }

  public onSwitchCurrency() {
    const baseCurrency = this.baseCurrencyFormGroup.getRawValue();
    const targetCurrency = this.targetCurrencyFormGroup.getRawValue();

    this.baseCurrencyFormGroup.setValue(targetCurrency)
    this.targetCurrencyFormGroup.setValue(baseCurrency)
  }

  private get baseCurrencyFormGroup() {
    return this.form.controls.baseCurrency;
  }

  private get targetCurrencyFormGroup() {
    return this.form.controls.targetCurrency
  }

  private get baseCurrencyAmountCtrl() {
    return this.baseCurrencyFormGroup.controls.amount;
  }

  private get baseCurrencyRateCtrl() {
    return this.baseCurrencyFormGroup.controls.rate;
  }

  private get targetCurrencyAmountCtrl() {
    return this.targetCurrencyFormGroup.controls.amount;
  }

  private get targetCurrencyRateCtrl() {
    return this.targetCurrencyFormGroup.controls.rate;
  }
}
