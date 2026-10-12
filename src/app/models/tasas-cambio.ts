export interface TasasCambio {
  result: string;
  base_code: string;
  rates: {
    [moneda: string]: number;
  }
}
