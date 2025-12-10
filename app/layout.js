import { Poppins, Pacifico } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
    weight: ['300', '400', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
})

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-pacifico'
})

export const metadata = {
    title: 'Una pregunta especial para Angie 💕',
    description: 'Una invitación especial',
}

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`${poppins.className} ${pacifico.variable}`}>{children}</body>
        </html>
    )
}
