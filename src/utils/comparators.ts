import { Product } from '../store/products/types';

const collator = new Intl.Collator('en', { caseFirst: 'upper' });

export const compareByNameAscending = (a: Product, b: Product) =>
  collator.compare(a.name, b.name);

export const compareByNameDescending = (a: Product, b: Product) =>
  collator.compare(b.name, a.name);

export const compareByPriceLowest = (a: Product, b: Product): number =>
  a.price - b.price;

export const compareByPriceHighest = (a: Product, b: Product): number =>
  b.price - a.price;
