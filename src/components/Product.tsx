import type {FC} from 'react';
import type {Product as ProductType} from '../../schema';
import type {SanityImageSource} from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import {client} from "../lib/client";
import {useNextSanityImage, UseNextSanityImageProps} from "next-sanity-image";
import Image from "next/image";

interface ProductProps {
    product: ProductType;
}

const Product: FC<ProductProps> = ({product}) => {
    const productImage = product.image && product?.image[0];
    const imageProps: UseNextSanityImageProps = useNextSanityImage(client, productImage as SanityImageSource);

    return (
        <div>
            <Link href={`/product/${product.slug?.current}`} passHref>
                <a className="product-card">
                    <Image
                        {...imageProps}
                        height={250}
                        width={250}
                        alt={product.name}
                        className="product-image"
                    />
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">${product.price}</p>
                </a>
            </Link>
        </div>
    );
};

export default Product;
