import React from "react";
import Link from "next/link";
import Footer from "./Footer";
import Info from "./Info";
import Image from "next/image";
import Logo from '../../public/product-images/logo.png'
import { useSession, signOut } from "next-auth/client";

const WelcomePage = () => {
  const [session, loading] = useSession();
  return (
    <>
      <h1 className="h1">
      
        <span >FootWorld</span>
       
      </h1>
      <div className="dabba">
        <span><Image className="bigLogo" src={Logo}/></span>
      
        { 
          session && session.user.email!="store"&&
          (
            <button className="mainButton">
            <Link href={"/products"}>
            Explore here &#8594;
              </Link>
              </button>
          )
        }
        
      
      </div>
      
      
      <Footer />
    </>
  );
};

export default WelcomePage;
