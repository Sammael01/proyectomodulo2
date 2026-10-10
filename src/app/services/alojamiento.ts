import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {MarketplaceData} from "../models/marketplace-data";
import {Resena} from "../models/resena";
import {Alojamiento} from "../models/alojamiento";
import {Filtros} from '../models/filtros';


@Injectable({providedIn: 'root'})
export class AlojamientoService {
    private url =  'assets/data/marketplace-data.json';

    constructor(private http: HttpClient) {}

    private getData(): Observable<MarketplaceData>{
        return this.http.get<MarketplaceData>(this.url);
    }

    public getAlojamientos(): Observable<Alojamiento[]>{
        return this.getData().pipe(
            map((d) => d.alojamientos.filter((a)  => a.activo && a.precioNoche > 0))
        );
    }

    public getAlojamientoById(id: number): Observable<Alojamiento | undefined> {
        return this.getAlojamientos().pipe(
            map((lista) => lista.find((a) => a.id === id))
        );
    }

    public getResenas(alojamientoId: number): Observable<Resena[]> {
        return this.getData().pipe(
            map((d) => d.resenas.filter((r) => r.alojamientoId === alojamientoId))
        );
    }

    public filtrar(f: Filtros): Observable<Alojamiento[]> {
        return this.getAlojamientos().pipe(
            map((lista) => {
                const resultado: Alojamiento[] = [];
                for (const a of lista) {
                    let cumple = true;
                    if (f.ciudad && a.ciudad !== f.ciudad) {
                        cumple = false;
                    }
                    if (f.huespedes && a.capacidad < f.huespedes) {
                        cumple = false;
                    }
                    if (f.tipo && a.tipo !== f.tipo) {
                        cumple = false;
                    }
                    if (f.precioMax && a.precioNoche > f.precioMax) {
                        cumple = false;
                    }
                    if (cumple) {
                        resultado.push(a);
                    }
                }
                return resultado;
            })
        );
    }

    public getCiudades(): Observable<string[]> {
        return this.getAlojamientos().pipe(
            map((lista) => {
                const ciudades: string[] = [];
                for (const a of lista) {
                    if (!ciudades.includes(a.ciudad)) {
                        ciudades.push(a.ciudad);
                    }
                }
                return ciudades;
            })
        );
    }

    public getTipos(): Observable<string[]> {
        return this.getAlojamientos().pipe(
            map((lista) => {
                const tipos: string[] = [];
                for (const a of lista) {
                    if (!tipos.includes(a.tipo)) {
                        tipos.push(a.tipo);
                    }
                }
                return tipos;
            })
        );
    }
}
