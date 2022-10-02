import type {FC} from 'react';
import type {Banner} from "../../schema";
import type {SanityImageSource} from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import {client} from "../lib/sanity.server";
import Image from "next/image";
import {useNextSanityImage, UseNextSanityImageProps} from "next-sanity-image";

interface Props {
    footerBanner: Banner;
}

const FooterBanner: FC<Props> = ({footerBanner}) => {
    const imageProps: UseNextSanityImageProps = useNextSanityImage(client, footerBanner?.image as SanityImageSource);

    return (
        <div className="footer-banner-container">
            <div className="banner-desc">
                <div className="left">
                    <p>{footerBanner.discount}</p>
                    <h3>{footerBanner.largeText1}</h3>
                    <h3>{footerBanner.largeText2}</h3>
                    <p>{footerBanner.saleTime}</p>
                </div>
                <div className="right">
                    <p>{footerBanner.smallText}</p>
                    <h3>{footerBanner.midText}</h3>
                    <p>{footerBanner.desc}</p>
                    <Link href={`/product/${footerBanner.product}`} scroll={false}>
                        <button type="button">{footerBanner.buttonText}</button>
                    </Link>
                </div>

                <div className="footer-banner-image">
                    <Image
                        {...imageProps}
                        alt={footerBanner.product}
                    />
                </div>
            </div>
        </div>
    );
};

export default FooterBanner;
