export interface Alojamiento {
  id: number;
  activo: boolean;
  nombre: string;
  descripcion: string;
  ciudad: string;
  ubicacion: string;
  tipo: string;
  capacidad: number;
  habitaciones: number;
  camas: number;
  banos: number;
  precioNoche: number;
  tarifaLimpieza: number;
  calificacion: number;
  imagenPrincipal: string;
  imagenes: string[];
  servicios: string[];
  reglas: string[];
}
