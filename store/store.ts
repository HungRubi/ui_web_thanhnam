import { configureStore } from "@reduxjs/toolkit";
import globalConfigReducer from "./globalConfigSlice";
import categoryReducer from "./categorySlice";
import storeReducer from "./storeSlice";
import newsReducer from "./newsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      globalConfig: globalConfigReducer,
      category: categoryReducer,
      store: storeReducer,
      news: newsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

