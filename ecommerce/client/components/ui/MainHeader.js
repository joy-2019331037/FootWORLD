import React from "react";
import Link from "next/link";
import MainNavBar from "./MainNavBar";
import Logo from '../../public/product-images/homeLogo.png'
import Image from "next/image";


const MainHeader = () => {
  return (
    <header className="flex justify-between items-center p-8 px-20 ">
      <Link
        href={"/"}
        className="shadow p-4 rounded-xl shadow-fuchsia-300 hover:shadow-slate-500"
      >
        <div>
          <span className="logoTitle">
            <Image className='Logo' src={Logo}/>
            FootWORLD
          </span>
          
        </div>
      </Link>
      <MainNavBar />
    </header>
  );
};

export default MainHeader;
