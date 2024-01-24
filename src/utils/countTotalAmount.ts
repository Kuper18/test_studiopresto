/* eslint-disable no-restricted-syntax */
import { ProductQuantities } from '../types/ProductQuantities';

export function countTotalAmount(productQuantities: ProductQuantities): string {
  let amount = 0;

  // eslint-disable-next-line guard-for-in
  for (const key in productQuantities) {
    amount += productQuantities[key].amount;
  }

  return amount.toFixed(2);
}
