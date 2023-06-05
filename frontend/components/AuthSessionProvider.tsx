"use client"
import { SessionProvider } from 'next-auth/react';

type Props = {
    children: React.ReactNode;
};

const AuthSessionProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthSessionProvider;