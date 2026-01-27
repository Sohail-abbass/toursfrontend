// "use client";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTours } from "./store/features/tourSlice";
// import { Card, Row, Col, Spin } from "antd";

// import { home } from "./utils/home";
// export default function HomePage() {
//   const dispatch = useDispatch();
//   const { tours, loading } = useSelector((state) => state.tour);

//   useEffect(() => {
//     dispatch(fetchTours());
//   }, [dispatch]);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-4xl font-bold text-center mb-10" style={{color
//         : '#1890ff'
//       }}>Explore Amazing Tours ✈️</h1>
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Spin size="large" />
//         </div>
//       ) : (
//         <Row gutter={[16, 16]}>
//           {tours.map((tour) => (
//             <Col xs={24} sm={12} md={8} lg={6} key={tour.id}>
//               <Card
//                 hoverable
//                 className="rounded-2xl shadow-md"
//                 cover={<img alt={tour.title} src={tour.image} className="h-52 w-full object-cover" />}
//               >
//                 <h2 className="text-xl font-semibold">{tour.title}</h2>
//                 <p className="text-gray-600">{tour.location}</p>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// }
