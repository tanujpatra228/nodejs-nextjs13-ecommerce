"use client"
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store, persistedStore } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
    children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                <PersistGate persistor={persistedStore}>
                    {children}
                </PersistGate>
            </Provider>
        </SessionProvider>
    )
}

export default Providers;