export type TipoPlato = 'entrada' | 'segundo' | 'jugo';

export interface Plato {
  nombre: string;
  descripcion: string;
  precio: string;
  imagen?: string;
  tipo: TipoPlato;
  indicaciones?: string;
  estado?: string; // 👈 NUEVO
}
