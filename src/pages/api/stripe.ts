import type {NextApiRequest, NextApiResponse} from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, {
    apiVersion: '2022-08-01',
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                submit_type: 'pay',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                mode: 'payment',
                shipping_options: [
                    {
                        shipping_rate: 'shr_1Le1H0B6Q8BHrrBI1XIoNEBt',
                    },
                    {
                        shipping_rate: 'shr_1Le0U7B6Q8BHrrBIxCpM7EIi',
                    }
                ],
                line_items: req.body.map((item: any) => {
                    const img = item.image[0].asset._ref;
                    const newImg = img.replace('image-', 'https://cdn.sanity.io/images/ypzzjwff/production/').replace('-webp', '.webp');

                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImg],
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity,
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
            res.status(200).json(session);
        } catch (err) {
            res.status(500).json('Error: ' + err);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
