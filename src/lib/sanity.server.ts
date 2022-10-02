import {createClient} from "next-sanity";
import {sanityConfig} from "./config";

export const client = createClient(sanityConfig)

export const previewClient = createClient({
    ...sanityConfig,
    useCdn: false,
    // Fallback to using the WRITE token until https://www.sanity.io/docs/vercel-integration starts shipping a READ token.
    // As this client only exists on the server and the token is never shared with the browser, we don't risk escalating permissions to untrustworthy users
    token: `${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
})

export const getClient = (preview: boolean) => (preview ? previewClient : client)
