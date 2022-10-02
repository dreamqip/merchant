import type {InferGetServerSidePropsType, NextPage} from "next";
import type * as Schema from '../../schema';
import {FooterBanner, HeroBanner, Product} from "../components";
import {client} from "../lib/sanity.server";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({products, banner}) => {
    return (
        <div>
            <HeroBanner heroBanner={banner && banner[0]}/>
            <div className="products-heading">
                <h2>Best Seller Products</h2>
                <p>speaker there are many variations</p>
            </div>

            <div className="products-container">
                {products.map(product => <Product key={product._id} product={product}/>)}
            </div>

            <FooterBanner footerBanner={banner && banner[0]}/>
        </div>
    );
};

export default Home;

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]';
    const products = await client.fetch<Schema.Product[]>(query);

    const bannerQuery = '*[_type == "banner"]';
    const banner = await client.fetch<Schema.Banner[]>(bannerQuery);

    return {
        props: {
            products,
            banner
        }
    }
}
