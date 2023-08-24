import React from "react";
import Image from "next/image";
import Logo from '../../public/product-images/logo.png'
const Footer = () => {
  return (
    <div className="footerDiv">
          
      <div className="content">
       
        <div className="logo">
          
          <Image className='smallLogo' src={Logo} alt=""/>
        
            <p className="logoText">FootWORLD</p>
            
      </div>
       
        <div className="slogan">
          {/* <p className="">
            Quality Assurance
          </p>
          <p className="">
            Wide Selection
          </p>
          <p className="">
            Unbeatable Prices
          </p>
          <p className="">
            Convenient Shopping
          </p> */}
          <p className="">
          Your Personalized Shopping Heaven
          </p>
        </div>
        
      </div>
      
    
    </div>
  );
};

export default Footer;
