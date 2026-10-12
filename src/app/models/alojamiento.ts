export interface Resena {
  autor: string;
  fecha: string;
  puntuacion: number;
  comentario: string;
}

export interface Oferta {
  proveedor: string;
  precio: number;
  destacada?: boolean;
}

export interface Alojamiento {
  id: number;
  activo: boolean;
  nombre: string;
  descripcion: string;
  ciudad: string;
  ubicacion: string;
  tipo: string;
  estrellas: number;
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
  resenas: Resena[];
  totalResenas: number;
  ofertas: Oferta[];
  etiqueta?: string;
}

/** Acepta una URL de imagen o un gradiente CSS y devuelve un valor válido para `background`. */
export function fondo(imagen: string): string {
  return imagen.startsWith('http') ? `center / cover no-repeat url('${imagen}')` : imagen;
}

export function etiquetaCalificacion(nota: number): string {
  if (nota >= 9) {
    return 'Fantástico';
  }
  if (nota >= 8.5) {
    return 'Excelente';
  }
  return nota >= 8 ? 'Muy bueno' : 'Bueno';
}
