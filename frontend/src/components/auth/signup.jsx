"use client"
import { axiosInstance } from '@/config/axios-config';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/customer/register', {
        email,
        password,
      });

      if (response.status === 200) {
        router.push('/login');
      }
    } catch (err) {
      setError('Signup failed');
    } 
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        <h2 className="heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field-wrapper">
            <p className="in-name">Email or Phone Number</p>
            <input 
              type="email" 
              placeholder="Enter your email or phone" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="in-name">Password</p>
            <div className="password-field">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                className="input-field" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Image 
                src="/assets/images/img/eye.svg"
                className="eye-icon"
                alt={showPassword ? "Hide Password" : "Show Password"}
                onClick={togglePasswordVisibility}
                width={24}
                height={24}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="sign-up-button" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <p className="sign-in-text">
              Already have an account? <a href="/login" className="sign-in-link">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
