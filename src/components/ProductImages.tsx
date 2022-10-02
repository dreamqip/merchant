import type {FC} from 'react';
import type {Product as ProductType} from "../../schema";
import type {SanityImageSource} from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import {urlFor} from "../lib/client";
import {useNextSanityImage, UseNextSanityImageProps} from "next-sanity-image";
import {memo, useState} from "react";
import {client} from "../lib/sanity.server";

interface Props {
    product: ProductType;
}

const ProductImages: FC<Props> = ({product}) => {
    const [index, setIndex] = useState<number>(0);
    let productImage = product.image && product.image[index]

    const imageProductProps: UseNextSanityImageProps = useNextSanityImage(client, productImage as SanityImageSource);

    return (
        <div>
            <div className="image-container">
                <Image {...imageProductProps}
                       alt={product.name}
                       className="product-detail-image"
                       width={400}
                       height={400}
                />
            </div>
            <div className="small-images-container">
                {product.image && product.image.map((image, i) => {
                    return <img
                        key={image._key}
                        src={urlFor(image).url() || ""}
                        alt="product image"
                        className={i === index ? "small-image selected-image" : "small-image"}
                        onMouseEnter={() => setIndex(i)}
                    />
                })}
            </div>
        </div>
    );
};

export default memo(ProductImages);
