import { AppProps } from 'next/app'
import '../app/globals.css' // Importando o arquivo global CSS que contém as configurações do Tailwind

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
