import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
type CartItem = {
  id: string;
  price: number;
  image: string;
  name: string;
  quantity: number;
};

// Define the store state
interface CartState {
  cartItems: CartItem[];
  cartSize: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  delete1FromCart: (productId: string) => void;
}
const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      cartSize: 0,
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            // Item already exists in cart, update its quantity or any other property
            const updatedItems = state.cartItems.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return { cartItems: updatedItems };
          }

          // Item doesn't exist in cart, add it to the cart
          return {
            cartItems: [
              ...state.cartItems,
              {
                ...product,
                quantity: 1,
              },
            ],
            cartSize: state.cartSize + 1,
          };
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
          cartSize: state.cartSize - 1,
        }));
      },
      delete1FromCart: (productId) => {
        set((state) => {
          const newItems = state.cartItems.slice();
          const index = newItems.findIndex((item) => item.id === productId);
          newItems[index].quantity = newItems[index].quantity - 1;
          return { cartItems: newItems };
        });
      },
      clearCart: () => {
        set({ cartItems: [], cartSize: 0 });
      },
    }),
    {
      name: "cart",
    }
  )
);

export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useCartSize = () => useCartStore((state) => state.cartSize);
export const useCartSetter = () =>
  useCartStore(
    (state) => [state.addToCart, state.removeFromCart] as const,
    shallow
  );
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () =>
  useCartStore((state) => state.removeFromCart);
export const useRemove1FromCart = () =>
  useCartStore((state) => state.delete1FromCart);
export const useClearCart = () => useCartStore((state) => state.clearCart);
