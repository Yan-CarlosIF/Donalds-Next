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
  toggleCart: () => void;
  addProductToCart: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
} as ICartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
