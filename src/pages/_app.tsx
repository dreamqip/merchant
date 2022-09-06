import '../styles/globals.css'
import type {AppProps} from 'next/app'
import dynamic from "next/dynamic";

const StateContext = dynamic(() => import('../context/StateContext'));
const PageTransitions = dynamic(() => import('../components/PageTransitions'));
const Toaster = dynamic(() => import('../components/Toaster'));

const Layout = dynamic(() => import('../components/Layout'));

function MyApp({Component, pageProps, router}: AppProps) {

    return (
        <StateContext>
            <Layout>
                <Toaster/>
                <PageTransitions router={router}>
                    <Component {...pageProps}/>
                </PageTransitions>
            </Layout>
        </StateContext>
    )
}

export default MyApp;
