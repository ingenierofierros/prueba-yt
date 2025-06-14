import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StructCalc - Calculadora de Estructuras Metálicas',
  description: 'Calculadora profesional para el peso y costo de estructuras metálicas con perfiles estándar mexicanos',
  keywords: 'calculadora, estructuras metálicas, peso, acero, construcción, IPR, IPS, perfiles',
  authors: [{ name: 'StructCalc' }],
  creator: 'StructCalc',
  openGraph: {
    title: 'StructCalc - Calculadora de Estructuras Metálicas',
    description: 'Calculadora profesional para el peso y costo de estructuras metálicas',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StructCalc - Calculadora de Estructuras Metálicas',
    description: 'Calculadora profesional para el peso y costo de estructuras metálicas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}