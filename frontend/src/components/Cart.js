import React, { useState, useEffect } from "react";
import "./css/Cart.css";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./footer";
import emptyCart from "../images/EmptyCart.webp";
import { CiCircleRemove } from "react-icons/ci";
import Rating from "@mui/material/Rating";
import Loader from "./Loader";
import Chat from "./Chat";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_CART;
  const { user } = useAuth0();
  let values = {};

  if (user) values = { email: user.email };
  useEffect(() => {
    const userEmail = values.email;
    if (userEmail) {
      fetch(`${apiUrl}/${userEmail}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data.userCart);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [values]);

  const handleClick = (id) => {
    const userEmail = values.email;
    if (userEmail) {
      fetch(`${apiUrl}/${userEmail}/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCart((prevState) => {
              const updatedCart = prevState.filter(
                (cartItem) => cartItem._id !== id
              );
              return updatedCart;
            });
          } else {
            console.log(data.message);
          }
        });
    }
  };

  return (
    <div className="cart-div">
      <div className="cart-content">
        {loading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
          <>
            {user ? (
              <>
                {cart.length > 0 ? (
                  <ul>
                    {cart.map((filtered) => {
                      return (
                        <li key={filtered._id} className="cart-li">
                          <div className="cart-item">
                            <div className="cart-image">
                              <img src={filtered.image} alt="cover" />
                            </div>
                            <div className="cart-text">
                              <div className="cart-info fw-7 fs-18">
                                <span>{filtered.bookname}</span>
                              </div>
                              <div className="cart-info fs-15">
                                <span className="text-capitalize fw-7">
                                  Author:{" "}
                                </span>
                                <span>{filtered.author}</span>
                              </div>
                              <div className="cart-info fs-15">
                                <span className="text-capitalize fw-7">
                                  Contact:{" "}
                                </span>
                                <span>{filtered.contact}</span>
                              </div>
                              <div className="cart-info fs-15">
                                <span className="text-capitalize fw-7">
                                  Price: ₹
                                </span>
                                <span>{filtered.price}</span>
                              </div>
                              <div className="star">
                                <Rating
                                  name="read-only"
                                  value={filtered.rating}
                                  precision={0.5}
                                  readOnly
                                  style={{ fontSize: 45 }}
                                />
                              </div>
                              <Chat contact={filtered.contact} />
                            </div>
                            <div className="cart-remove">
                              {user && (
                                <button
                                  title="Remove"
                                  onClick={() => handleClick(filtered._id)}
                                >
                                  <CiCircleRemove id="cart-remove" size={40} />
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="cart">
                    <img src={emptyCart} alt="" id="empty-img" />
                    <span className="empty-text">Your Cart Is Empty.</span>
                  </div>
                )}
              </>
            ) : (
              <div className="cart">
                <img src={emptyCart} alt="" id="empty-img" />
                <span className="empty-text">Your Cart Is Empty.</span>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
