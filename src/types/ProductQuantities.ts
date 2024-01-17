type ProductInfo = {
  quantity: number;
  amount: number;
};

export type ProductQuantities = {
  [key: number]: ProductInfo;
};
