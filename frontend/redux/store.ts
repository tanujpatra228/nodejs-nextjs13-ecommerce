import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slice/cart';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const cartPersistConfig = {
    key: 'iws-cart',
    storage
};

const persistCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        cart: persistCartReducer
    }
});

export const persistedStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
