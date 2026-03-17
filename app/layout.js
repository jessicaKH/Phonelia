import './globals.css'

export const metadata = {
  title: 'Phonelia',
  description: 'Application de rééducation orthophonique',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
