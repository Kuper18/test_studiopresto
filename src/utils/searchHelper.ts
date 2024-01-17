/* eslint-disable no-restricted-syntax */
type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

export function getSearchWith(search: URLSearchParams, params: Params) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}
