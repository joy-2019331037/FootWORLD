import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BankLogo from './bank.png'
import swal from "sweetalert2";
const PaymentDetail = ({ isLoading, data, cartDetail }) => {


  const [accountID, setAccountID] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  
  let gid, gpass;
  let fid,
    fpass,fmoney,fname,femail,
    stat = true;

  const toggleLoggedIn = () => {
    setLoggedIn((prevValue) => !prevValue);
  };

  const toggle = React.useCallback(() => setLoggedIn(!loggedIn));

  const router = new useRouter();
  const [sessionEmail, setSessionEmail] = useState("");

  const [money,setMoney] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');


  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth/login");
        console.log("no session");
      } else {
        console.log(session);
        setSessionEmail(session.user.email);
      }
    });
  }, []);

  getSession();

  console.log(loggedIn);

  console.log(money);
  console.log(name);
  console.log(email);


  function getAccountInfo(e) {
    e.preventDefault();
    gid = accountID;
    gpass = password;
    console.log(accountID);
    console.log(password);

    getBank(gid);

    function getBank(accountID) {
      fetch("http://localhost:4000/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: accountID,
        }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((ans) => {
          console.log(ans);
          


          fpass = ans.user.password;
          fid = ans.user._id;
          fmoney = ans.user.money;
          fname = ans.user.name;
          femail = ans.user.email;          
          setMoney(fmoney);
          setName(fname);
          setEmail(femail);

        

          if (fpass == gpass) {
              toggleLoggedIn();
          }
        })
        .catch((e) => {
          swal.fire(
            {
              icon: 'error',
              title: 'Sorry',
              text: 'No such account!',
              footer: 'Please check your password correctly'
            }
          )
          stat = false;
          console.log("no account");
          console.log(e);
        });
    }

  }

  return (
    <div className="bankHome">
      <Head>
        <title>Account Info</title>
      </Head>
      <Image className='bankLogo' src={BankLogo}/>
      
       
          
          {!loggedIn && (
            <div className="loginContainer">
            <form className="form" onSubmit={getAccountInfo}>
                <label> <b>Account Id</b></label>
                <input
                  type="text"
                  value={accountID}
                  onChange={(event) => {
                    setAccountID(event.target.value);
                  }}
                  className="input"
                  placeholder="Your Account ID"
                />
              
              <label> <b>Password</b></label>
                <input
                  type="password"
                  value={password}
                  className="input"
                  placeholder="Your password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              
              <button className="proceedButton">Login</button>
            </form>
            </div>
          )}
        
          {loggedIn &&(
            <div className="bankDetails">
                <label>Account user: <b>{name}</b> </label>
                <label>User email: <b>{email}</b></label>
                <label>Current Balance:<b>  ৳ <i>{money}</i></b></label>
            </div>)
          }
          
        
      
    </div>
  );
};

export default PaymentDetail;



























// import BankContext from "@/contexts/bank-context";
// import { getSession } from "next-auth/client";
// import { useContext, useEffect, useState } from "react";
// import swal from "sweetalert2";
// import Image from "next/image";
// import BankLogo from './bank.png';
// export default function BankConnect() {
//   const [sessionEmail, setSessionEmail] = useState("");
//   var stat = true;
//   useEffect(() => {
//     getSession().then((session) => {
//       console.log(session);
//       setSessionEmail(session.user.email);
//     });
//   }, []);
//   var userData ;
//   const bankCtx = useContext(BankContext);
//   console.log(bankCtx);
//   useEffect(() => {
//     //get
//   });

//   var varify;
//   var xyzpass;
//   function getBank() {
//     fetch("http://localhost:4000/get-user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: sessionEmail,
//       }),
//     })
//       .then((resp) => {
//         return resp.json();
//       })
//       .then((ans) => {
//         console.log(ans);
//         /////////////////////////////////////////////////
//         //bankCtx.setConnectedToBank(true);
        
//         // setBankUser({
//         //   email: ans.user.email,
//         //   name: ans.user.name,
//         //   money: ans.user.money,
//         // });
//         xyzpass = ans.user.password;
//         varify = ans.secret;
        
//         bankCtx.setBankDetails({
//           name: ans.user.name,
//           email: ans.user.email,
//           amount: ans.user.money,
//           //password: ans.user.password
//         });
        
//       })
//       .catch((e) => {
//         stat = false;
//         console.log(e);
//       });
  


    
  



//     swal.fire({
//       title: 'Enter your password to connect to the bank',
//       input: 'password',
//       showCancelButton: true,
//       confirmButtonText: 'Connect',
//       preConfirm: async (password) => {
//         try {
//           //const userData = ans.json();
  
//           const fetchedPassword = xyzpass;
          
//           console.log("Fetched password : ",fetchedPassword);
          
          
//           if (!stat) {
//             throw new Error("Status failed");
//           }
  
          
//           if (password !== fetchedPassword) {
//             throw new Error("Passwords do not match");
//           }
  
//           // Assuming the fetched user data has properties "name", "email", and "amount"
          
  
//           return ;
  
//         } catch (error) {
//           swal.showValidationMessage(`Authentication failed: ${error.message}`);
//         }
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         bankCtx.setConnectedToBank(true);
//         /*
//         bankCtx.setBankDetails({
//           name: result.value.name,
//           email: result.value.email,
//           amount: result.value.amount,
//         });
//         */

         
//         // swal.fire({
//         //   position: 'top-end',
//         //   icon: 'success',
//         //   title: 'Connected to bank successfully',
//         //   showConfirmButton: false,
//         //   timer: 1500
//         // });
        

//         swal.fire(
          
//           'User Verification',
//           `Verification code : ${varify}`,
//           'success'
//         );

       
//       }
//     });
//   }
  
//   return (

  //   <section>
  //   <div className="bankHome">
  //     <Image className='bankLogo' src={BankLogo}/>
  //     <button
  //       className="proceedButton"
  //       onClick={() => {
  //         getBank();
  //       }}
  //     >
  //       Proceed to Payment
  //     </button>

  //     <div className="accountDetails">
  //       <input type="text"  nanme ="bankAccount" placeholder="Your Account ID"></input>
  //     </div>
      
  //     {bankCtx.connectedToBank && (
  //     <div className="bankDetails">
  //       <div>username : <b>{bankCtx.bankDetails.name}</b></div>
  //       <div>email : <b>{bankCtx.bankDetails.email}</b></div>
  //       <div>amount : <i><b>৳ {bankCtx.bankDetails.amount}</b></i></div>
  //     </div>
  //   ) }

  //   </div>
    
  // </section>

      
//   );
// }



// // import BankContext from "@/contexts/bank-context";
// // import { getSession } from "next-auth/client";
// // import { useContext, useEffect, useState } from "react";
// // import BankLogo from './bank.png';
// // import Image from "next/image";
// // export default function BankConnect() {
// //   const [sessionEmail, setSessionEmail] = useState("");
// //   useEffect(() => {
// //     getSession().then((session) => {
// //       console.log(session);
// //       setSessionEmail(session.user.email);
// //     });
// //   }, []);
// //   //   const [bankUser, setBankUser] = useState({
// //   //     email: "",
// //   //     name: "",
// //   //     money: "",
// //   //   });
// //   const bankCtx = useContext(BankContext);
// //   console.log(bankCtx);
// //   useEffect(() => {
// //     //get
// //   });
// //   function getBank() {
// //     fetch("http://localhost:4000/get-user", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         email: sessionEmail,
// //       }),
// //     })
// //       .then((resp) => {
// //         return resp.json();
// //       })
// //       .then((ans) => {
// //         console.log(ans);
        
// //         bankCtx.setConnectedToBank(true);
// //         // setBankUser({
// //         //   email: ans.user.email,
// //         //   name: ans.user.name,
// //         //   money: ans.user.money,
// //         // });
// //         bankCtx.setBankDetails({
// //           name: ans.user.name,
// //           email: ans.user.email,
// //           amount: ans.user.money,
// //         });
// //       })
// //       .catch((e) => {
// //         console.log(e);
// //       });
// //   }
// //   return (
//     // <section>
//     //   <div className="bankHome">
//     //     <Image className='bankLogo' src={BankLogo}/>
//     //     <button
//     //       className="proceedButton"
//     //       onClick={() => {
//     //         getBank();
//     //       }}
//     //     >
//     //       Proceed to Payment
//     //     </button>


        
//     //     {bankCtx.connectedToBank && (
//     //     <div className="bankDetails">
//     //       <div>username : <b>{bankCtx.bankDetails.name}</b></div>
//     //       <div>email : <b>{bankCtx.bankDetails.email}</b></div>
//     //       <div>amount : <i><b>৳ {bankCtx.bankDetails.amount}</b></i></div>
//     //     </div>
//     //   ) }








//     //   </div>
      
//     // </section>
// //   );
// // }
