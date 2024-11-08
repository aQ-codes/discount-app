import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="logo">Scentora</div>


    <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">New Arrivals</a></li>
        <li><a href="#">Brands</a></li>
    </ul>


    <div className="search-bar">
        <input type="text" placeholder="Search for products..."/>
        <span className="search-icon"><Image src="/assets/icons/search-icon.png" alt="" height={30} width={30}/></span>
    </div>

    <div className="icons">
        <div className="icon wishlist">
            <span><Image src="/assets/icons/Vector.png" alt="" height={30} width={30}/></span>
            <span className="badge">2</span>
        </div>
        <a href="/cart">
            <div className="icon cart">
                <span><Image src="/assets/icons/Cart1.png" alt=""  height={30} width={30}/></span>
                <span className="badge">4</span>
            </div>
        </a>
        <div className="icon profile">
            <span><Image src="/assets/icons/person.png" alt=""  height={30} width={30}/></span>
        </div>
    </div>
    </nav>
  )
}

export default Navbar