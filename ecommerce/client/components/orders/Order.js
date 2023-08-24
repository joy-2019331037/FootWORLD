import { useSession } from "next-auth/client";
import swal from 'sweetalert2';
export default function OneOrder({ e }) {
  const [session, loading] = useSession();
  const pendingDiv = <div className="bg-green-400 p-2 rounded">Pending</div>;
  const successDiv = <div className="bg-blue-400 p-2 rounded">Delivered</div>;
  function makeOrderDone() {
    fetch(`http://localhost:4000/make-order-done?txid=${e.trxId}`)
      .then((ans) => {
        return ans.json();
      })
      .then((anss) => {
        console.log(anss);
        swal.fire("Order is delivered. Please Refresh")
        updateSupplier(e.cost);
        degradeAdmin(e.cost);
      });
  }

  function updateSupplier(cost) {
    fetch("http://localhost:4000/update-supplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "64e7ae4f1955fb0d1bfab280",
        money: cost,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((ans) => {
        console.log(ans.user);
      });
  }
  function degradeAdmin(cost) {
    fetch("http://localhost:4000/degrade-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "64e7ae861955fb0d1bfab282",
        money: cost,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((ans) => {
        console.log(ans.user);
      });
  }







  return (
    <>
    
     
    <li className="list">
    <div>{e.trxId}</div>
      <div>{e.address}</div>
      <div>{e.cost}</div>
      <div>{e.productQuantity}</div>
      <div>{e.email}</div>
      
      {e.status === "pending" ? pendingDiv : successDiv}

      {session.user.email === "store" ? (
        <button
          onClick={makeOrderDone}
          className="border-2 border-green-400 p-1 rounded bg-white"
        >
          Deliver Product
        </button>
      ) : null}
    </li>
   
    
    </>
  );
}
