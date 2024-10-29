import {ModelBase} from './model-base';

export interface Sale extends ModelBase{
  nrf:string;
  employee:string;
  product: string;
  client: string;
}
