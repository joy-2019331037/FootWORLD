import { useRef } from "react";
import { getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";

import Image from "next/image";
import Logo from '../../public/product-images/logo.png'

export default function LoginPage() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  async function handleSubmit(e) {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (result.error) {
      return alert("Log In failed.Please try again carefully...");
    }
    router.replace("/");
  }
  return (
    <>
      <div className="login">
      <center>
        <Image className="loginLogo" src={Logo}></Image>
      <h1 className="header">
            Sign In here
          </h1>
      </center>
        <div className="loginContainer">
         
          <form className="form">
            <input
              ref={emailRef}
              className="input"
              type="email"
              placeholder="Your email"
            />
            <input
              ref={passwordRef}
              className="input"
              type="password"
              placeholder="Your password"
            />
            <button onClick={handleSubmit} className="loginButton">
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
