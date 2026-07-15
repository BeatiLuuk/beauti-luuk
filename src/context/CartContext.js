'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('beautiluuk_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('beautiluuk_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product._id);
      
      if (existingItem) {
        const newQty = Math.min(existingItem.quantity + quantity, product.stock || 50);
        return prevItems.map((item) =>
          item.productId === product._id ? { ...item, quantity: newQty } : item
        );
      } else {
        return [
          ...prevItems,
          {
            productId: product._id,
            productIdCode: product.productId, // Barcode ID e.g. MH10...
            name: product.name,
            price: product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price,
            quantity: Math.min(quantity, product.stock || 50),
            image: product.images[0] || '/products/placeholder.png',
            category: product.category,
            maxStock: product.stock || 50,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(newQty, item.maxStock) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
