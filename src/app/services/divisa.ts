import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TasasCambio} from '../models/tasas-cambio';

@Injectable({providedIn: 'root'})
export class DivisaService {
  private url = 'https://open.er-api.com/v6/latest/COP';

  constructor(private http: HttpClient) {}

  public getTasas(): Observable<TasasCambio> {
    return this.http.get<TasasCambio>(this.url);
  }
}
