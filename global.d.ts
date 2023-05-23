declare module "global" {
  export type User = {
    name: string;
    email: string;
    role: string;
    address: string;
  };
  export type CartItem = {
    id: string;
    price: number;
    image: string;
    name: string;
    quantity: number;
  };
}
