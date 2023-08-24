import { createContext, useState } from "react";

const CartContext = createContext({
  increment: () => {},
  decrement: () => {},
  state: [],
});
export default CartContext;
const initialState = [
  {
    id: "64df8ca58e46c11a93532d6c",
    quantity: 0,
    name:"Jersey"
  },
  {
    id: "64dfba20743771c156a8892b",
    quantity: 0,
    name:"Al-rihla"
  },
  {
    id: "64dfbb83743771c156a8892c",
    quantity: 0,
    name:"Nike Shoe"
  },
];
export function CartContextProvider({ children }) {
  const [state, setState] = useState(initialState);
  function incrementProduct(id) {
    console.log("inc");
    const updateState = state.map((e) => {
      if (id === e.id) {
        return {
          ...e,
          quantity: e.quantity + 1,
        };
      }

      return {
        ...e,
      };
    });
    setState(updateState);
  }
  function decrementProduct(id) {
    const updateState = state.map((e) => {
      if (id === e.id) {
        if(e.quantity<1)
          return {...e};
        return {
          ...e,
          quantity: e.quantity - 1,
        };
      }

      return {
        ...e,
      };
    });
    setState(updateState);
  }
  return (
    <CartContext.Provider
      value={{
        incrementProduct,
        decrementProduct,
        state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
