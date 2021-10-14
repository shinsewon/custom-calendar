import { createContext, useReducer, useContext, useMemo } from "react";
import { reducer, initialState } from "./reducer";

// 추후 Provider를 사용하지 않았을 때에는 context의 값이 null이 되어야 하기때문에 null 값을 선언해준다.
const StateContext = createContext(null);
const DispatchContext = createContext(null);

const factoryUseContext = (name, context) => {
  return () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error(
        `use${name}Context must be used withing a ${name}ContextProvider.`
      );
    }
    return ctx;
  };
};

export const useStateContext = factoryUseContext("StateContext", StateContext);
export const useDispatchContext = factoryUseContext(
  "DispatchContext",
  DispatchContext
);

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const values = useMemo(() => state, [state]);

  return (
    <StateContext.Provider value={values}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
