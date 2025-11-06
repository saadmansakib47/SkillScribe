"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Course } from '../lib/courses';

interface WishlistItem {
  course: Course;
  addedAt: Date;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (course: Course) => void;
  removeFromWishlist: (courseId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (courseId: number) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    // Load wishlist from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('skillscribe_wishlist');
      if (savedWishlist) {
        try {
          const parsed = JSON.parse(savedWishlist);
          return parsed.map((item: WishlistItem) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
        } catch (error) {
          console.error('Error loading wishlist:', error);
        }
      }
    }
    return [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('skillscribe_wishlist', JSON.stringify(items));
    } else {
      localStorage.removeItem('skillscribe_wishlist');
    }
  }, [items]);

  const addToWishlist = (course: Course) => {
    setItems(prev => {
      // Check if already in wishlist
      if (prev.some(item => item.course.id === course.id)) {
        return prev;
      }
      return [...prev, { course, addedAt: new Date() }];
    });
  };

  const removeFromWishlist = (courseId: number) => {
    setItems(prev => prev.filter(item => item.course.id !== courseId));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const isInWishlist = (courseId: number) => {
    return items.some(item => item.course.id === courseId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        itemCount: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
