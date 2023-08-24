import OneOrder from "@/components/orders/Order";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ShowOrders() {
  const [data, setData] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // Initialize userEmail in state
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth/login");
        console.log("no session");
      } else {
        setUserEmail(session.user.email); // Update userEmail state
       // console.log(userEmail set to ${userEmail});
        console.log(typeof userEmail);
      }
    });

    fetch("http://localhost:4000/get-transactions")
      .then((resp) => resp.json())
      .then((anss) => {
        console.log(anss);
        setData(anss);
      });
  }, []);

  return (
    <div>
      <ul>
      <div className="orders">
      <center><b><font color="" size="40px" >Orders</font></b></center>
      </div>
      <span></span>
        <div className="orderListTitle">
        
        <div>Transaction Id</div>
        <div>Address</div>
        <div>Cost</div>
        <div>Quantity</div>
        <div>Email</div>
        <div>Status</div>
        {
          userEmail=="daraz"
            &&
            <div>Delivery Status</div> 
        }
        </div>
        
        {data &&
          data.ans.map((e, id) => {
            // console.log(${e.email} -> ${e.cost} === ${userEmail});
            // console.log(e.email === userEmail);
            if(e.email == userEmail || userEmail=="store")
              return <OneOrder e={e} key={id} />;
          })}
      </ul>
    </div>
  );
}
































// import OneOrder from "@/components/orders/Order";
// import { useEffect, useState } from "react";
// import { getSession } from "next-auth/client";

// export default function ShowOrders() {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//         getSession().then((session) => {
          
//         });
//     fetch("http://localhost:4000/get-transactions")
//       .then((resp) => {
//         return resp.json();
//       })
//       .then((anss) => {
//         console.log(anss);
//         setData(anss);
//       });
//   }, []);

//   return (
//     <div>
//       <ul>
//         {data &&
//           data.ans.map((e, id) => {
//             return (
//               // <li
//               //   key={id}
//               //   className="flex justify-between border-2 border-orange-400 mt-4 rounded p-4 font-bold items-center"
//               // >
//               //   <div>{e.address}</div>
//               //   <div>{e.cost}</div>
//               //   <div>{e.productQuantity}</div>
//               //   <div>email:{e.email}</div>
//               //   <div>{e.trxId}</div>
//               //   {e.status && pendingDiv}
//               //   <div className="border-2 border-orange-400 p-1 rounded bg-white">
//               //     mark as delivered
//               //   </div>
//               // </li>
//               <OneOrder e={e} key={id} />
//             );
//           })}
//       </ul>
//     </div>
//   );
// }
