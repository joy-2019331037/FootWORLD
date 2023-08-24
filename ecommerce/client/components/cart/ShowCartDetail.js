import React from "react";
import Link from "next/link";
import Loading from "../ui/Loading";
import { findProductQuantity } from "@/utils/product-cart";
const ShowCartDetail = ({ isLoading, data, cartDetail }) => {
  function calculateTotalForASingleItem(productId, productPrice) {
    const product = cartDetail.state.find((e) => {
      return e.id === productId;
    });
    return product.quantity * productPrice;
  }

  return (
    <section className="header">
      <div className="title">
        <label>Name</label>
        <label>Price</label>
        <label>Quantity</label>
        <label>Total</label>
      </div>
      <div className="ul">
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="ul">
            {data.map((e) => {
              return (
                <li
                  className="list"
                  key={e._id}
                >
                  <Link href={`products/${e._id}`}>
                    {e.name} 
                  </Link>
                  <div>
                   {e.price}
                   
                  </div>
                  <div>
                    {findProductQuantity(e._id, cartDetail)}'s 
                  
                  </div>
                  <div>
                    
                  ৳ {calculateTotalForASingleItem(e._id, e.price)}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ShowCartDetail;
