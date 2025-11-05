"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Course } from '../lib/courses';

interface CartItem {
  course: Course;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  clearCart: () => void;
  isInCart: (courseId: number) => boolean;
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('skillscribe_cart');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          return parsed.map((item: CartItem) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      }
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('skillscribe_cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('skillscribe_cart');
    }
  }, [items]);

  const addToCart = (course: Course) => {
    setItems(prev => {
      // Check if already in cart
      if (prev.some(item => item.course.id === course.id)) {
        return prev;
      }
      return [...prev, { course, addedAt: new Date() }];
    });
  };

  const removeFromCart = (courseId: number) => {
    setItems(prev => prev.filter(item => item.course.id !== courseId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (courseId: number) => {
    return items.some(item => item.course.id === courseId);
  };

  const subtotal = items.reduce((sum, item) => sum + item.course.price, 0);
  const discount = 0; // Can be calculated based on promo codes
  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        itemCount: items.length,
        subtotal,
        discount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
