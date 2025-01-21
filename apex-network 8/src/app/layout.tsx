import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/ThemeProvider'
import Navbar from '../components/Navbar'
import DynamicBackground from '../components/DynamicBackground'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider>
          <DynamicBackground />
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

