@Injectable({providedIn: 'root'})
export class ReservaService {
    private clave = 'reservas';

    public getReservas(): Reserva[] {
        const texto = localStorage.getItem(this.clave);
        return texto ? JSON.parse(texto) : [];
    }

    public crearReserva(datos: Omit<Reserva, 'id' | 'estado'>): Reserva {
        const reservas = this.getReservas();

        let mayorId = 0;
        for (const r of reservas) {
            if (r.id > mayorId) {
                mayorId = r.id;
            }
        }

        const reserva: Reserva = {
            id: mayorId + 1,
            alojamientoId: datos.alojamientoId,
            alojamientoNombre: datos.alojamientoNombre,
            ciudad: datos.ciudad,
            fechaLlegada: datos.fechaLlegada,
            fechaSalida: datos.fechaSalida,
            huespedes: datos.huespedes,
            noches: datos.noches,
            total: datos.total,
            nombreHuesped: datos.nombreHuesped,
            correo: datos.correo,
            estado: 'CONFIRMADA',
        };

        reservas.push(reserva);
        localStorage.setItem(this.clave, JSON.stringify(reservas));
        return reserva;
    }
}