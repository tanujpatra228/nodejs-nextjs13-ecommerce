"use client"

import { useSession, signOut, signIn } from 'next-auth/react';

const AuthButton = () => {
    const { data: session } = useSession();
    return (
        <>
            {
                session && session.user ? (
                    <div className='flex gap-4 ml-auto'>
                        <p className='text-sky-600'>{session.user.name}</p>
                        <button onClick={() => signOut()}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <button onClick={() => signIn()}>
                        Login
                    </button>
                )
            }
        </>
    )
}

export default AuthButton