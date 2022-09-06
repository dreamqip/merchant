import {FC, useRef} from 'react';
import {useStateContext} from "../context/StateContext";
import {AiOutlineLeft} from "@react-icons/all-files/ai/AiOutlineLeft";
import {AiOutlineShopping} from "@react-icons/all-files/ai/AiOutlineShopping";
import Link from "next/link";
import {urlFor} from "../lib/client";
import {AiOutlineMinus} from "@react-icons/all-files/ai/AiOutlineMinus";
import {AiOutlinePlus} from "@react-icons/all-files/ai/AiOutlinePlus";
import {TiDeleteOutline} from "@react-icons/all-files/ti/TiDeleteOutline";
import toast from "react-hot-toast";

const Cart: FC = () => {
    const cartRef = useRef<HTMLDivElement>(null);
    const {
        totalQuantities,
        setShowCart,
        totalPrice,
        cartItems,
        toggleCartItemQuantity,
        removeHandler
    } = useStateContext();

    const closeCart = () => {
        setShowCart(false);
    }

    const checkoutHandler = async () => {
        const getStripe = await import('../lib/getStripe');
        const stripe = await getStripe.default();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems)
        });

        if (!response.ok) return;
        const session = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({
            sessionId: session.id
        })
    }

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button type="button" className="cart-heading" onClick={closeCart}>
                    <AiOutlineLeft/>
                    <span className="heading">Your cart</span>
                    <span className="cart-num-items">({totalQuantities} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150}/>
                        <h3>Your shopping bag is empty</h3>
                        <Link href="/">
                            <button type="button" onClick={closeCart} className="btn">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >= 1 && cartItems.map((item: any) => (
                        <div key={item._id} className="product">
                            <img src={urlFor(item.image && item.image[0]).auto('format').url()} alt={item.name}
                                 className="cart-product-image"/>
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4 className="price">${item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus"
                                                  onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus/></span>
                                            <span className="num">{item.quantity}</span>
                                            <span className="plus"
                                                  onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus/></span>
                                        </p>
                                    </div>
                                    <button type="button" className="remove-item"
                                            onClick={() => removeHandler(item._id)}>
                                        <TiDeleteOutline/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick={checkoutHandler}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
