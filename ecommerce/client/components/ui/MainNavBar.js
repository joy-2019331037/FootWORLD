import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
const MainNavBar = () => {
  const [session, loading] = useSession();
  console.log(session);
  function logOut() {
    signOut();
  }
  return (
    <nav>
      <ul className="ul">
        {!session && (
          <li className="link">
            <Link href={"/auth/login"}>Login</Link>
          </li>
        )}
        {!session && (
          <li className="link">
            <Link href={"/auth/signup"}>SignUp</Link>
          </li>
        )}
        {session && session.user.email!="store"&& (
          <li className="link">
            <Link href={"/bank"}> Upay </Link>
          </li>
        )}
        {session  && (
          <li className="link">
            <Link href={"/orders"}>Orders</Link>
          </li>
        )}
        {session && session.user.email!="store" && (
          <li className="link">
            <Link href={"/products"}>Buy here</Link>
          </li>
        )}
        {session && session.user.email!="store" && (
          <li className="link">
            <Link href={"/cart"}>View Cart</Link>
          </li>
        )}
        {session && (
          <li className="link">
            <button onClick={logOut}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavBar;
