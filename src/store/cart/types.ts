export type CartItem = {
  id: number;
  name: string;
  description: string;
  sizeType: 'volume' | 'weight';
  size: number;
  price: number;
  amount: number;
  imgUrl: string;
};

export type CartState = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
};
