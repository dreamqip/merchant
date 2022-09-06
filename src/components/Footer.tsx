import {FC} from 'react';
import {AiFillInstagram} from "@react-icons/all-files/ai/AiFillInstagram";
import {AiOutlineTwitter} from "@react-icons/all-files/ai/AiOutlineTwitter";

const Footer: FC = () => {
    return (
        <div className="footer-container">
            <p>2022 Merchant All rights reserved</p>
            <p className="icons">
                <AiFillInstagram/>
                <AiOutlineTwitter/>
            </p>
        </div>
    );
};

export default Footer;
