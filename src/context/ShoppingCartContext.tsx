import { createContext, useContext, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Cart Item Interface

interface CartItem {
  id: number;
  quantity: number;
}

// Shopping Cart Context Interface

interface ShoppingCartContextProps {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

// ShoppingCartProvider Props

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity =
    cartItems &&
    cartItems.reduce((qunatity, item) => item.quantity + qunatity, 0);

  const getItemQuantity = (id: number) => {
    return cartItems?.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemQuantity = (id: number) => {
    setCartItems((_currentItems) => {
      if (!_currentItems.find((item) => item.id === id)) {
        return [..._currentItems, { id, quantity: 1 }];
      } else {
        return _currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseItemQuantity = (id: number) => {
    setCartItems((_currentItems) => {
      if (_currentItems.find((item) => item.id === id)?.quantity === 1) {
        return _currentItems.filter((item) => item.id !== id);
      } else {
        return _currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((_currentItems) =>
      _currentItems.filter((item) => item.id !== id)
    );
  };

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
