import { useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from '../../public/product-images/logo.png'
import swal from 'sweetalert2'

export default function SignUpPage() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    const ans = await response.json();
    console.log(ans);
    if (ans.user) {
      swal.fire(
        'User has been created successfully.'
      );
      router.replace("/auth/login");
    }
  }

  return (
    <>
      <div className="login">
      <center>
        <Image className="loginLogo" src={Logo}></Image>
      <h1 className="header">
            Sign Up here
          </h1>
      </center>
        <div className="loginContainer">
        <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Your name"
          ref={nameRef}
        />
        <input
          className="input"
          type="email"
          placeholder="Your email"
          ref={emailRef}
        />
        <input
          ref={passwordRef}
          className="input"
          type="password"
          placeholder="choose a password"
        />
        <button onClick={handleSubmit} className="loginButton">
          Sign Up
        </button>
      </form>
        </div>
      </div>
    </>
  );
}
