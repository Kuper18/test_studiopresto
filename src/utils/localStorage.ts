/* eslint-disable @typescript-eslint/no-explicit-any */
export const setItemToLocalStorage = (key: string, value: any) => {
  let items = JSON.parse(localStorage.getItem(key) || '[]');

  if (key === 'quantity') {
    if (typeof value === 'number') {
      delete items[0][value];
      localStorage.setItem(key, JSON.stringify(items));
    } else {
      localStorage.setItem(key, JSON.stringify([{ ...items[0], ...value }]));
    }
  }

  if (key === 'ids') {
    items = items.includes(value)
      ? items.filter((item: any) => item !== value)
      : [...items, value];

    localStorage.setItem(key, JSON.stringify(items));
  }
};

export const clearLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
