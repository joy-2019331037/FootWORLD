import CartContext from "@/contexts/cart-context";
import { findProductQuantity } from "@/utils/product-cart";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert2";

const PaymentDetail = ({ isLoading, data, cartDetail }) => {

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [secret, setSecret] = useState("");
  let gaddress, gmobile, gsecret;

  const [accountID, setAccountID] = useState("");
  const [password, setPassword] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  let gid, gpass;
  let fid,
    fpass,
    stat = true;

  const toggleOrderPlaced = () => {
    setOrderPlaced((prevValue) => !prevValue);
  };
  const toggle = React.useCallback(() => setOrderPlaced(!orderPlaced));
  const router = new useRouter();
  const [sessionEmail, setSessionEmail] = useState("");

  function calTotalPrice() {
    let total = 0;
    data.map((e) => {
      total = total + +e.price * +findProductQuantity(e._id, cartDetail);
    });
    return total;
  }
  const cardContext = useContext(CartContext);
  console.log(cardContext);
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

  // console.log(orderPlaced);
  // console.log(gaddress);
  // console.log(gmobile);
  // console.log(gsecret);
  // console.log(address);
  // console.log(mobile);
  // console.log(secret);

  function handleTransaction(e) {
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
          // fmoney = ans.user.money;

          //console.log(fetching ${fid});
          console.log(fpass);
          console.log(fid);
          if (fpass == gpass) {
            const data = {
              address: address,
              email: sessionEmail,
              mobile: mobile,
              productQuantity:
                cardContext.state[0].quantity +
                cardContext.state[1].quantity +
                cardContext.state[2].quantity,
              cost: calTotalPrice(),
            };
            console.log(data);
            fetch("http://localhost:4000/transaction", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((ans) => {
                return ans.json();
              })
              .then((anss) => {
                console.log(anss);
                if (anss.msg === "transaction complete") {
                  swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Succesfully confirmed order',
                    timer: 1500,
                    showConfirmButton: false
                  });
                  router.replace('/orders');
                  
                  //console.log(asdasd ${data.cost});
                  
                  updateEcommerce('64e7ae861955fb0d1bfab282',data.cost);

                }else{                  
                  swal.fire({
                  icon: 'error',
                  title: 'Something went wrong!',
                  text: 'You do not have enough balance to complete this transaction' 
                });
                }
              });
          }
        })
        .catch((e) => {
          alert('No such account');
          stat = false;
          console.log("no account");
          console.log(e);
        });
    }

    function updateEcommerce(accountID,cost){
      fetch("http://localhost:4000/update-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: accountID,
          money: cost
        }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((ans) => {
            console.log(ans.user);
        });

    }

  }

  function placeOrder(e) {
    e.preventDefault();
    console.log("inside placeholder");
    gaddress = address;
    gsecret = secret;
    gmobile = mobile;

    console.log(gaddress);
    console.log(gsecret);
    console.log(gmobile);
    console.log(orderPlaced);
    toggle();

    
  }

  return (
    <>
    
      

        {!orderPlaced &&
        (<div className="paymentDetails">
              <Head>
              < title>Your Cart</title>
              </Head>
            <div className="titleDiv">
              <span>
                <b>Subtotal</b>
              </span>
              <span className="money">
              ৳ {!isLoading && data && calTotalPrice()} 
              </span>
            </div>
         
            <form className="form" onSubmit={placeOrder}>
              <div>
                <input
                
                  type="text"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                  className="input"
                  placeholder="Your address"
                />
              </div>
              <div>
                <input
                  type="text"
                  // ref={mobileRef}
                  value={mobile}
                  className="input"
                  placeholder="Your mobile no"
                  onChange={(event) => {
                    setMobile(event.target.value);
                  }}
                />
              </div>
              
              <button className="confirmOrder">Proceed to Payment</button>
            </form>
             
        </div>)
        }
       





        {orderPlaced && (
         <div className="paymentDetails">


         <div className="titleDiv">
              <span>
                <b>Account Info</b>
              </span>
             
            </div>

          
            <form onSubmit={handleTransaction}>
              <div>
                <input
                  type="text"
                  value={accountID}
                  onChange={(event) => {
                    setAccountID(event.target.value);
                  }}
                  className="my-6 border-2 border-solid border-black"
                  placeholder="Your Account ID"
                />
              </div>
              <div>
                <input
                  type="text"
                  // ref={mobileRef}
                  value={password}
                  className="my-6 border-2 border-solid border-black"
                  placeholder="Your password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              {/* <div>
              <input
                onChange={(event) => {
                  setSecret(event.target.value);
                }}
                value={secret}
                type="text"
                className="border-2 border-slate-600 rounded mb-14"
                placeholder="Your Secret No."
              />
            </div> */}
              <button className="h-12 w-32 mt-10 font-white-bold text-l text-white bg-black rounded-xl">Place Order</button>
            </form>
          
        </div>
        )
        }
        
   </>
  )
};

export default PaymentDetail;













// import { findProductQuantity } from "@/utils/product-cart";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import Head from "next/head";
// import CartContext from "@/contexts/cart-context";
// import { useRouter } from "next/router";
// import { getSession } from "next-auth/client";
// import swal from 'sweetalert2';


// const PaymentDetail = ({ isLoading, data, cartDetail }) => {
//   const addressRef = useRef();
//   const mobileRef = useRef();
//   const secretRef = useRef();
//   const router = useRouter();
//   const [sessionEmail, setSessionEmail] = useState("");
//   function calTotalPrice() {
//     let total = 0;
//     data.map((e) => {
//       total = total + +e.price * +findProductQuantity(e._id, cartDetail);
//     });
//     return total;
//   }
//   const cartCtx = useContext(CartContext);
//   console.log(cartCtx);
//   useEffect(() => {
//     getSession().then((session) => {
//       if(!session){
//         router.replace("/auth/login");
//       }
//       else{
//         console.log(session);
//         setSessionEmail(session.user.email);
//       }
      
//     });
//   }, []);
//   getSession();
//   function handleTransaction(e) {
//     e.preventDefault();
//     const data = {
//       address: addressRef.current.value,
//       email: sessionEmail,
//       mobile: mobileRef.current.value,
//       productName:{
//         "p1":cartCtx.state[0].name,
//         "p2":cartCtx.state[1].name,
//         "p3":cartCtx.state[2].name,
//       },
//       productQuantity:
//         cartCtx.state[0].quantity +
//         cartCtx.state[1].quantity +
//         cartCtx.state[2].quantity,
//       cost: calTotalPrice(),
//     };
//     fetch("http://localhost:4000/transaction", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((ans) => {
//         return ans.json();
//       })
//       .then((anss) => {

//         console.log(anss);
//         if(anss.msg==='transaction complete'){
//           swal.fire({
//             position: 'center',
//             icon: 'success',
//             title: 'Your order is confirmed',
//             showConfirmButton: false,
//             timer: 1500
//           })
//           mobileRef.current.value="";
//           addressRef.current.value='';
//           router.replace("/products");
//         }
//         else{
//           swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Something went wrong!',
//             footer: 'You don\'t have sufficient balance',
//           });
//         }
//       });
//   }



  
//   return (
//     <div className="paymentDetails">
//       <Head>
//         <title>Cart Page</title>
//       </Head>
//       <div className="titleDiv">
//         <span >
//           <b>Subtotal</b>
//         </span>
//         <span className="money">
//         ৳ {!isLoading && data && calTotalPrice()} 
//         </span>
//       </div>
        
//           <form className='form' onSubmit={handleTransaction}>
             
//                 <b>Address</b>
//                 <input
//                 className='input'
//                   type="text"
//                   ref={addressRef}
                  
//                 />         
//                 <b>Mobile Number</b> 
//                 <input
//                   type="text"
//                   ref={mobileRef}
//                   className="input"
//                 />
              
           
//             {/* <div>
//               <label htmlFor="" className="text-4xl">
//                 Secret: &nbsp;&nbsp;&nbsp;
//                 <input
//                   ref={secretRef}
//                   type="text"
//                   className="border-2 border-slate-600 rounded mb-14"
//                 />
//               </label>
//             </div> */}
//             <button className="confirmOrder">Confirm order</button>
//           </form>
       
      
//     </div>
//   );
// };

// export default PaymentDetail;
