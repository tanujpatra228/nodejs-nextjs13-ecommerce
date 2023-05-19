import NavBar from '@/components/NavBar';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Online Shopping | Buy Clothing and Fashion Accessories',
    description: 'Buy Clothing and Fashion Accessories',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <header>
                    <NavBar />
                </header>
                <main className='mt-20'>
                    {children}
                </main>
            </body>
        </html>
    )
}
