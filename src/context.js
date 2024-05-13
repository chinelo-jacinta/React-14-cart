import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 7,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //clear cart functionn
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  // Remove button
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };
  // increase button
  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };
  // decrease button
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };
  // fetching data from url
  const fetchData = async () => {
    dispatch({ type: 'LOADING' });

    const response = await fetch(url);
    const cart = await response.json();
    console.log(cart);
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
