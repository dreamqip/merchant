import type { NextPage } from 'next'
import {useStateContext} from "../context/StateContext";
import {BiBadgeCheck} from "@react-icons/all-files/bi/BiBadgeCheck";
import Link from "next/link";
import {useEffect} from "react";
import {createConfetti} from "../lib/utils";

const Success: NextPage = () => {
    const {setTotalQuantities, setTotalPrice, setCartItems} = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setTotalQuantities(0);
        setTotalPrice(0);
        setCartItems([]);
        createConfetti();
    }, [setCartItems, setTotalPrice, setTotalQuantities])

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BiBadgeCheck/>
                </p>
                <h1>Thank you for your order!</h1>
                <p className="email-msg">Check your email inbox for the receipt.</p>
                <p className="description">
                    If you have any questions, please contact us at <a className="email" href="mailto:test@gmail.com">test@gmail.com</a>
                </p>
                <Link href="/">
                    <button type="button" className="btn">Continue shopping</button>
                </Link>
            </div>
        </div>
    );
};

export default Success;
