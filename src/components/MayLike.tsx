import type {FC} from 'react';
import type {Product as ProductType} from "../../schema";
import {Product} from "./";
import {memo} from "react";

interface Props {
    products: ProductType[];
}

const MayLike: FC<Props> = ({products}) => {
    return (
        <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (
                        <Product key={item._id} product={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(MayLike);
