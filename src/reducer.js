import CartItem from './CartItem';

const reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cart) => {
        return cart.id !== action.payload;
      }),
    };
  }
  if (action.type === 'INCREASE') {
    let temptCart = state.cart.map((singleCart) => {
      if (singleCart.id === action.payload) {
        return { ...singleCart, amount: singleCart.amount + 1 };
      }
      return singleCart;
    });
    return {
      ...state,
      cart: temptCart,
    };
  }
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((singleCart) => {
        if (singleCart.id === action.payload) {
          return { ...singleCart, amount: singleCart.amount - 1 };
        }
        return singleCart;
      })
      .filter((item) => item.amount !== 0);

    return {
      ...state,
      cart: tempCart,
    };
  }
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotalPrice = price * amount;
        cartTotal.amount += amount;
        cartTotal.total += itemTotalPrice;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  return state;
};

export default reducer;
