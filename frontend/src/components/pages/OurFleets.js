import React from "react";
import MetaData from "../layouts/MetaData";
import { useEffect } from "react";
// import { getProducts } from "../actions/productsActions";
// import { useDispatch, useSelector } from "react-redux";
// import { getVehicles } from "../actions/vehicleActions";
// import Hero from './hero/Hero'
import VehicleList from "../contents/VehicleList";
import { useNavigate } from "react-router-dom";

export default function OurFleets() {
     const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { vehicles } = useSelector((state) => state.vehicleState);
//   const { loading, userLoading, error, isAuthenticated, user } = useSelector(
//     (state) => state.authState
//   );
//   useEffect(() => {
//     dispatch(getVehicles);
//   }, []);

  return (
    
    <>
      <MetaData title={"Our Fleets"} />
        
      <VehicleList/>

    </>
  );
}
