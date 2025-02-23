"use client";

import { Product } from "@prisma/client";
import { createContext, useState } from "react";

export interface CartProduct
  extends Pick<Product, "name" | "id" | "price" | "imageUrl"> {
  name: string;
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  totalPrice: number;
  toggleCart: () => void;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  totalPrice: 0,
  toggleCart: () => {},
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
} as ICartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const toggleCart = () => {
    setIsOpen((prevState) => !prevState);
  };

  const addProductToCart = (product: CartProduct) => {
    const productIsInCart = products.find((item) => item.id === product.id);

    if (!productIsInCart) {
      return setProducts((prevState) => [...prevState, product]);
    }

    setProducts((prevState) => {
      return prevState.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
          };
        } else {
          return item;
        }
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id !== productId) {
          return product;
        }
        if (product.quantity === 1) {
          return product;
        }

        return {
          ...product,
          quantity: product.quantity - 1,
        };
      });
    });
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        return {
          ...product,
          quantity: product.quantity + 1,
        };
      });
    });
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        totalPrice,
        toggleCart,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
