import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-brand">
                <h2>Scentora</h2>
                <p>
                    We have perfumes that suits your <br />style and which you’re proud.
                </p>
                <div className="social-icons">
                    <a href="#"><Image src="/assets/icons/twitter.png" alt="" height={30} width={30}/></a>
                    <a href="#"><Image src="/assets/icons/fb2.png" alt="" height={30} width={30}/></a>
                    <a href="#"><Image src="/assets/icons/insta.png" alt="" height={30} width={30}/></a>
                    <a href="#"><Image src="/assets/icons/git.png" alt="" height={30} width={30}/></a>
                </div>
            </div>

            <div className="footer-links">
                <div className="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Works</a></li>
                        <li><a href="#">Career</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Help</h3>
                    <ul>
                        <li><a href="#">Customer Support</a></li>
                        <li><a href="#">Delivery Details</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>FAQ</h3>
                    <ul>
                        <li><a href="#">Account</a></li>
                        <li><a href="#">Manage Deliveries</a></li>
                        <li><a href="#">Orders</a></li>
                        <li><a href="#">Payments</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>Scentora © 2000-2023, All Rights Reserved</p>
            <div className="payment-icons">
                <Image src="/assets/icons/visa.png" alt="Visa" height={30} width={30} />
                <Image src="/assets/icons/master.png" alt="MasterCard"  height={30} width={30}/>
                <Image src="/assets/icons/paypal.png" alt="PayPal" height={30} width={30}/>
                <Image src="/assets/icons/applepay.png" alt="Apple Pay" height={30} width={30}/>
                <Image src="/assets/icons/gpay.png" alt="Google Pay" height={30} width={30}/>
            </div>
        </div>
    </footer>
  )
}

export default Footer