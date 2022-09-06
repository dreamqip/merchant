import type {FC} from 'react';
import type {SanityImageSource} from "@sanity/image-url/lib/types/types";
import type {Banner} from '../../schema';
import Link from "next/link";
import {client} from "../lib/client";
import {useNextSanityImage, UseNextSanityImageProps} from "next-sanity-image";
import Image from "next/image";

interface Props {
    heroBanner: Banner;
}

const HeroBanner: FC<Props> = ({heroBanner}) => {
    const imageProps: UseNextSanityImageProps = useNextSanityImage(client, heroBanner?.image as SanityImageSource);

    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <div className="hero-banner-image">
                    <Image
                        {...imageProps}
                        alt={heroBanner.product}
                        priority={true}
                        height={450}
                        width={450}
                    />
                </div>

                <div>
                    <Link href={`/product/${heroBanner.product}`} scroll={false}>
                        <button type="button">{heroBanner.buttonText}</button>
                    </Link>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
