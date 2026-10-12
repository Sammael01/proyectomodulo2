export interface TasasCambio {
  base_code: string;
  rates: {
    [moneda: string]: number;
  }
}
