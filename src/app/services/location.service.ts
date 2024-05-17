import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private countryUrl = `${environment.baseUrl}/country`;
  private cityUrl = `${environment.baseUrl}/city`;
  private apiAlldataUrl = `${environment.baseUrl}/all-data`;
  private weatherApiKey = 'cc3f739d2f4240c5b2945643241705'; // Reemplaza con tu clave real de WeatherAPI
  private weatherUrl = `https://api.weatherapi.com/v1/current.json`;
  private convertApDivisasKey = '00a90dc02bdf42bb31772031'; // Reemplaza con tu clave real de WeatherAPI
  private convertApiDivisasUrl= "https://v6.exchangerate-api.com/v6/"
  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.countryUrl);
  }

  getCities(): Observable<any> {
    return this.http.get<any>(this.cityUrl);
  }
  getCityName(cityId: number): Observable<any> {
    return this.http.get<any>(`${this.cityUrl}/${cityId}`);
  }

  getCountryName(countryId: number): Observable<any> {
    return this.http.get<any>(`${this.countryUrl}/${countryId}`);
  }
  getAllQueries(): Observable<any> {
    return this.http.get<any>(this.apiAlldataUrl);
  }

  convertDivisas(fromCurrency: string, toCurrency: string, amount: number): Observable<any> {
    const apiUrl = `https://v6.exchangerate-api.com/v6/${this.convertApDivisasKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    return this.http.get<any>(apiUrl);
  }



  getWeather(cityName: string): Observable<any> {
    const params = new HttpParams().set('key', this.weatherApiKey).set('q', cityName).set('aqi', 'no');
    return this.http.get<any>(this.weatherUrl, { params });
  }

  submitData(countryId: number, cityId: number, climate: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('country_id', countryId.toString())
      .set('city_id', cityId.toString())
      .set('money_cop', '')
      .set('money_foreign_currency', '')
      .set('climate', climate)
      .set('exchange_rate', '');

    return this.http.post(`${environment.baseUrl}/all-data`, body, { headers });
  }

  updateData(id: number, countryId: number, cityId: number, climate: string, money_cop: number, money_foreign_currency: string, exchange_rate: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('country_id', countryId.toString())
      .set('city_id', cityId.toString())
      .set('money_cop', money_cop.toString())
      .set('money_foreign_currency', money_foreign_currency.toString())
      .set('climate', climate)
      .set('exchange_rate', exchange_rate.toString());

    return this.http.put(`${environment.baseUrl}/all-data/${id}`, body, { headers });
  }
}
