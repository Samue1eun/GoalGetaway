// import React, { useState, useEffect } from "react";

// const MyHotels = ({ hotels }) => {
//   const [hotelList, setHotelList] = useState([]);
//   const [hotelDetailsList, setHotelDetailsList] = useState([]);
//   const displayLimit = 10;

//   useEffect(() => {
//     if (Array.isArray(hotels.data)) {
//       setHotelList(hotels.data.slice(0, displayLimit));
//       setHotelDetailsList([]);
//     } else {
//       setHotelList([]);
//     }
//   }, [hotels]);

//   useEffect(() => {
//     const fetchHotelDetails = async (hotel) => {
//       try {
//         const formattedName = hotel.name.replaceAll(" ", "_");
//         const response = await fetch(
//           `http://127.0.0.1:8000/api/v1/api_app/hotel_details/${formattedName}/`
//         );
//         if (response.ok) {
//           const details = await response.json();
//           setHotelDetailsList((prevDetails) => [...prevDetails, details]);
//         } else {
//           console.error("Error fetching hotel details:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     hotelList.forEach((hotel) => fetchHotelDetails(hotel));
//   }, [hotelList]);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Hotels</h2>
//       <ul>
//         {hotelDetailsList.length > 0 ? (
//           hotelDetailsList.map((hotelDetails, index) => (
//             <li key={index} className="mb-4">
//               <div className="flex flex-col md:flex-row justify-between items-center">
//                 <div className="flex flex-col md:flex-row items-start">
//                   {/* Image */}
//                   {hotelDetails.image_url && (
//                     <img
//                       src={hotelDetails.image_url}
//                       alt={hotelDetails.name}
//                       className="w-24 h-24 object-cover mr-4"
//                     />
//                   )}
//                   <div>
//                     <h3 className="font-semibold">{hotelDetails.name}</h3>
//                     <p>{hotelDetails.formatted_address}</p>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))
//         ) : (
//           <li>Loading hotel details...</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default MyHotels;