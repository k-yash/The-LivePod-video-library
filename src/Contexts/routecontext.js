// import { createContext, useState, useContext } from "react";

// // Current Product Context
// const CurrVideoContext = createContext();

// export function CurrVideoProvider({ children }) {
//   const [current, setCurrent] = useState([]);

//   return (
//     <CurrVideoContext.Provider value={{ current, setCurrent }}>
//       {children}
//     </CurrVideoContext.Provider>
//   );
// }

// export function useCurrVideo() {
//   return useContext(CurrVideoContext);
// }

// // Current Route Context
// const RouteContext = createContext();

// export function RouteProvider({ children }) {
//   const [route, setRoute] = useState("Home");
//   // Home, Cart, Wishlist, Products, Account, Product-Description

//   return (
//     <RouteContext.Provider value={{ route, setRoute }}>
//       {children}
//     </RouteContext.Provider>
//   );
// }

// export function useRoute() {
//   return useContext(RouteContext);
// }
