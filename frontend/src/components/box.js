import React from 'react'

const Box = () => {
  return (
    <div className="box">
    <div className="col-4"></div>
    <div className="col-4 sign-text">
        Sign up and get 20% off on your first order.
        <a href="">Sign Up Now</a>
    </div>
    <div className="col-4">
        <img src="../img/cross.svg" alt="" />
    </div>
    </div>
  )
}

export default Box