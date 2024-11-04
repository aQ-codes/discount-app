"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import axios from 'axios';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signin', {
        username,
        password,
      });

      if (response.status === 200) {
        // Redirect on successful login
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="background-image">
      <div className="card">
        <Image 
          src="/assets/images/img/cross-ash.svg"
          className="close-icon"
          alt="Close"
          width={96}
          height={40}
        />
        <h2 className="heading">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-feild-wrapper">
            <p className="in-name">Email or Phone Number</p>
            <input 
              type="text" 
              placeholder="Enter your email or phone" 
              className="input-field" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="in-name">Password</p>
            <div className="password-field">
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="input-field" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image 
                src="/assets/images/img/eye.svg"
                className="eye-icon"
                alt="Show Password"
                width={24}
                height={24}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="sign-up-button">Sign In</button>
            <p className="sign-in-text">Don't have an account? <a href="/signup" className="sign-in-link">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin;
