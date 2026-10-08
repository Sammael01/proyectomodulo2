@Injectable({providedIn: 'root'})
export class AlojamientoService {
    private url =  'assets/data/marketplaces.json';

    constructor(private http: HttpClient) {}

    private getData(): Observable<MarketPlaceData>{
        return this.http.get<MarketPlaceData>(this.url);
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
}