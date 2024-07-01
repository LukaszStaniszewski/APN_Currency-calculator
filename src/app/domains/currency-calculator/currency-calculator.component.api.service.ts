import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ForeignCurrencyRatesDto} from "./currency-calculator.model";


@Injectable()
export class CurrencyCalculatorComponentApiService {
  private http = inject(HttpClient)

  private readonly BASE_NBP_URL = 'http://api.nbp.pl/api/exchangerates/'

  public getForeignCurrencyRates() {
    return this.http.get<ForeignCurrencyRatesDto[]>(`${this.BASE_NBP_URL}tables/a?format=json)`)
  }
}
