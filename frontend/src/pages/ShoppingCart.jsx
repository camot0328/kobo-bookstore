// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// function Cart() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("accessToken");
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     async function fetchCart() {
//       if (user && token) {
//         try {
//           const res = await axiosInstance.get("/cart", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             params: { userId: user.id },
//           });
//           setCartItems(res.data);
//         } catch (err) {
//           console.error("회원 장바구니 조회 실패", err);
//         }
//       } else {
//         const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
//         setCartItems(guestCart);
//       }
//     }

//     fetchCart();
//   }, []);

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="container py-4">
//       <h2>장바구니</h2>
//       {cartItems.length === 0 ? (
//         <p>장바구니가 비어 있습니다.</p>
//       ) : (
//         <>
//           <ul className="list-group mb-4">
//             {cartItems.map((item) => (
//               <li
//                 key={item.isbn}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 <img
//                   src={item.thumbnail}
//                   alt={item.title}
//                   style={{ width: "60px", objectFit: "contain" }}
//                 />
//                 <span className="flex-grow-1 px-3">{item.title}</span>
//                 <span>{item.quantity}권</span>
//                 <strong>
//                   {(item.price * item.quantity).toLocaleString()}원
//                 </strong>
//               </li>
//             ))}
//           </ul>

//           <h4>총 합계: {total.toLocaleString()}원</h4>
//           <button className="btn btn-primary">결제하기</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;
