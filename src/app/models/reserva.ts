export interface Reserva {
  id: number;
  alojamientoId: number;
  alojamientoNombre: string;
  ciudad: string;
  fechaLlegada: string;
  fechaSalida: string;
  huespedes: number;
  noches: number;
  total: number;
  nombreHuesped: number;
  correo: string;
  estado: 'CONFIRMADA';
}

