import { Product } from '../types/Product';

const BASE_URL = 'https://fakestoreapi.com/products';

export function request<T>(url = ''): Promise<T> {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const getcategories = () => request<string[]>('/categories');
export const getAllProducts = () => request<Product[]>();
export const getProductById = (id: string) => request<Product>(`/${id}`);
export const getProductByCategory = (url: string) => {
  const currentUrl = url
    ? `/category/${url}`
    : '';

  return request<Product[]>(currentUrl);
};
