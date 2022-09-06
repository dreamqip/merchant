import {FC, PropsWithChildren} from 'react';
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="layout">
            <Head>
                <title>Store Home</title>
            </Head>

            <header>
                <Navbar/>
            </header>

            <main className="main-container">
                {children}
            </main>

            <footer>
                <Footer/>
            </footer>

        </div>
    );
};

export default Layout;
