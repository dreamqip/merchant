import sanityClient, {SanityClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client: SanityClient = sanityClient({
    projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2022-08-15',
    token: `${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
    return builder.image(source);
}
