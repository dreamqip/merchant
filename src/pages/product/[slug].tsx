import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import type * as Schema from "../../../schema";
import {client} from "../../lib/client";
import {AiFillStar} from "@react-icons/all-files/ai/AiFillStar";
import {AiOutlineStar} from "@react-icons/all-files/ai/AiOutlineStar";
import {AiOutlineMinus} from "@react-icons/all-files/ai/AiOutlineMinus";
import {AiOutlinePlus} from "@react-icons/all-files/ai/AiOutlinePlus";
import {useStateContext} from "../../context/StateContext";
import MayLike from "../../components/MayLike";
import ProductImages from "../../components/ProductImages";

interface Props {
    products: Schema.Product[];
    product: Schema.Product;
}

const ProductDetails: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({product, products}) => {
    const {increaseQty, decreaseQty, qty, addHandler, setShowCart} = useStateContext();

    const buyNowHandler = () => {
        addHandler(product, qty);

        setShowCart(true);
    }

    return (
        <div>
            <div className="product-detail-container">

                <ProductImages product={product}/>

                <div className="product-detail-desc">
                    <h1>{product.name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{product.details}</p>
                    <p className="price">${product.price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decreaseQty}><AiOutlineMinus/></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={increaseQty}><AiOutlinePlus/></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => addHandler(product, qty)}>Add to
                            Cart
                        </button>
                        <button type="button" className="buy-now" onClick={buyNowHandler}>Buy Now</button>
                    </div>
                </div>
            </div>

            <MayLike products={products}/>
        </div>
    );
};

export default ProductDetails;

export const getStaticPaths: GetStaticPaths = async () => {
    const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;
    const products = await client.fetch<Schema.Product[]>(query);

    const paths = products.map(product => ({
        params: {
            slug: product?.slug?.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
    const slug = params?.slug as string;

    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`;

    const product = await client.fetch<Schema.Product>(query);
    const products = await client.fetch<Schema.Product[]>(productsQuery);

    return {
        props: {
            product,
            products
        }
    }
}
