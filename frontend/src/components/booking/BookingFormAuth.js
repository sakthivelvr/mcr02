import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
  getServices,
  getServicesOfSelectedVehicle,
} from "../../actions/serviceActions";
import Select from "react-dropdown-select";
import { createOrder } from "../../actions/orderActions";
import { clearOrderCreated } from "../../slices/ordersSlice";
import { modifyTotalPriceAction } from "../../actions/totalPriceAction";
import { getSubServices } from "../../actions/subServiceActions";
import { getHourlyData } from "../../actions/hourlyDataActions";

export default function BookingFormAuth() {
  const [totalPrice, setTotalPrice] = useState(0);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedService, setSelectedService] = useState([{
    serviceCategory : "None"
  }]);
  const [selectedSubService, setSelectedSubService] = useState([{
    subServiceCategory : "None"
    }]);

  const [filteredServices, setfilteredServices] = useState(null);
  const [filteredSubServices, setfilteredSubServices] = useState([{
    subServiceCategory : 'NONE'
  }]);
  const [serviceStatus, setServiceStatus] = useState(false);
  const [serviceTypeStatus, setServiceTypeStatus] = useState(false);
  const [hoursStatus, setHoursStatus] = useState(false);
  const [cruiseTerminalsStatus, setCruiseTerminalsStatus] = useState(false);
  const [terminalStatus, setTerminalStatus] = useState(false);
  const [terminal, setTerminal] = useState('');
  const [cruiseTerminal, setCruiseTerminal] = useState('');

  // const [selectedSubServices, setselectedSubServices] = useState(null);

  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [noOfPax, setNoOfPax] = useState(0);
  const [noOfLuggage, setNoOfLuggage] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+65");
  const [message, setMessage] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [wayTransferPrice, setWayTransferPrice] = useState('');
  
  const [selectedHourlyData, setSelectedHourlyData] = useState([])

  

  const cruiseTerminals = [
    {
      _id: "1",
      value: "Marina Bay Cruise Centre",
      name: "Marina Bay Cruise Centre",
    },
    {
      _id: "2",
      value: "Harbour Front Ferry Terminal",
      name: "Harbour Front Ferry Terminal",
    },
    {
      _id: "3",
      value: "Tanah Merah Ferry Terminal",
      name: "Tanah Merah Ferry Terminal",
    },
    {
      _id: "4",
      value: "Changi Point  Ferry Terminal",
      name: "Changi Point  Ferry Terminal",
    },
  ]

  const terminalsData = [
    {
      _id: "1",
      value: "Terminal-1",
      name: "Terminal-1",
    },
    {
      _id: "2",
      value: "Terminal-2",
      name: "Terminal-2",
    },
    {
      _id: "3",
      value: "Terminal-3",
      name: "Terminal-3",
    },
    {
      _id: "4",
      value: "Terminal-4",
      name: "Terminal-4",
    }
  ]

  const paymentMethods = [
    {
      _id: "1",
      value: "CARD_PAYMENT",
      name: "CARD PAYMENT - 10% Admin charges",
    },
    {
      _id: "2",
      value: "PAYNOW_QR",
      name: "PAYNOW QR",
    },
    {
      _id: "3",
      value: "CASH_PAYMENT",
      name: "CASH PAYMENT",
    },
  ];

  

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.authState
  );
  const { services, servicesForSelectedVehicle } = useSelector(
    (state) => state.serviceState
  );

  const { hourlyData } = useSelector(
    (state) => state.hourlyDataState
  );

  const { subServices, subServicesForSelectedService } = useSelector(
    (state) => state.subServiceState
  );

  const { isOrderCreated, order } = useSelector((state) => state.orderState);

  const { vehicles } = useSelector((state) => state.vehicleState);
  let fullPriceDetails = useSelector((state) => state.totalPriceState);

  const [midnightSurcharge, setMidnightSurcharge] = useState(false);
  const [tuasSouthBoulevard, setTuasSouthBoulevard] = useState(false);
  const [additionalStopAlongtheWay, setAdditionalStopAlongtheWay] = useState(false);
  const [additionalStopOutoftheWay, setAdditionalStopOutoftheWay] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    let errMsg = [];
    if (!selectedVehicle) {
      errMsg.push("select the vehicle");
    }
    if (!selectedService) {
      errMsg.push("select the service");
    }
    if (pickupAddress.trim() === "") {
      errMsg.push("enter the pickup address");
    }
    if (dropoffAddress.trim() === "") {
      errMsg.push("enter the dropoff address");
    }

    if (noOfPax === 0) {
      errMsg.push("enter no of pax");
    }
    if (name === "") {
      errMsg.push("enter the Name");
    }
    if (email === "") {
      errMsg.push("enter the Email");
    }
    if (phoneNumber === "") {
      errMsg.push("enter the phone number");
    }
    if (!selectedPaymentMethod) {
      errMsg.push("select the payment method");
    }

    if (errMsg.length > 0) {
      toast(`Please ${errMsg.join(", ")}`, {
        position: "bottom-center",
        type: "error",
      });
      return;
    }

    document.getElementById("submitBtn").disabled = true;

    let bookingData = {
      category: selectedVehicle[0].category,
      serviceName: selectedService[0].title,
      serviceSubName: selectedSubService[0].title,

      vehicleName : selectedVehicle[0].name,
      rate: {
        serviceAmount: selectedSubService[0].price,
        fullAmount : totalPrice
      },

      bookingPlatform: "WEB",
      customerDetails: {
        name: name,
        email: email,
        phone: phoneNumber,

        message: message,
      },

      pickupDate: date,
      pickupTime: time,

      pickupAddress: pickupAddress,
      dropoffAddress: dropoffAddress,

      noOfPax: noOfPax,
      noOfLuggage: noOfLuggage,

      additionalCharges: {
        midnightSurcharge: {
          status: midnightSurcharge,
        },
        tuasSouthBoulevard: {
          status: tuasSouthBoulevard,
        },
        additionalStopAlongtheWay: {
          status: additionalStopAlongtheWay,
        },
        additionalStopOutoftheWay: {
          status: additionalStopOutoftheWay,
        },
      },
      paymentDetails : {
          paymentMode : selectedPaymentMethod[0].value,
          paymentStatus : "PENDING",
	    },
      
      orderStatus: "PENDING",
      user: user._id,
      vehicleId: selectedVehicle[0]._id,
      serviceId: selectedService[0]._id,
    };

    if(selectedSubService[0].subServiceCategory === 'AIRPORT_DEP' || selectedSubService[0].subServiceCategory === 'AIRPORT_DEP_ARR') {
      bookingData.dropoffAddress = bookingData.pickupAddress + ' ' + terminal
    }
    if(selectedSubService[0].subServiceCategory === 'AIRPORT_ARR') {
      bookingData.pickupAddress = bookingData.dropoffAddress + ' ' + terminal
    }

    // if(selectedSubService[0].subServiceCategory === 'CRUISE_DEP' ) {
    //   bookingData.dropoffAddress = bookingData.pickupAddress + ' ' + cruiseTerminal
    // }
    // if(selectedSubService[0].subServiceCategory === 'AIRPORT_ARR') {
    //   bookingData.pickupAddress = bookingData.dropoffAddress + ' ' + cruiseTerminal
    // }

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));

    if(selectedPaymentMethod[0].value === 'CASH_PAYMENT'){

      dispatch(createOrder(bookingData));
    } else if(selectedPaymentMethod[0].value === 'PAYNOW_QR') {
      navigate('/paymentqr')
    }else {

      navigate('/payment')
    }

  };


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    if (error) {
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }

    if (isOrderCreated) {
      toast("Booking successful , You will receive email soon", {
        position: "bottom-center",
        type: "success",
        onOpen: () => {
          setTimeout(() => {
            document.getElementById("submitBtn").disabled = false;
          }, "5000");
          dispatch(clearOrderCreated());
        },
      });
      return;
    }

    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumbers[0]);

    if (services.length === 0) {
      dispatch(getServices);
    }
    if (subServices.length === 0) {
      dispatch(getSubServices);
    }
    if (hourlyData.length === 0) {
      dispatch(getHourlyData);
    }
    
  }, [
    error,
    isAuthenticated,
    dispatch,
    navigate,
    selectedVehicle,
    filteredServices,
    isOrderCreated,
    totalPrice
  ]);

 

  const vehicleSelectHandler = (vehicle) => {
    setServiceStatus(false)

    setSelectedVehicle(vehicle);

    const res = services.filter(
      (service) => {
        return service.vehicleCategory === vehicle[0].category
      }
    );
    setfilteredServices(res);

    if(vehicle[0].category === '23_SEATER'){

      const filteredHrData = hourlyData.filter(
        (hrdata) => hrdata.hourlyDataCategory === '23_SEATER'
      );
      setSelectedHourlyData(filteredHrData[0].data)
    
    }else if(vehicle[0].category === '45_SEATER'){

      const filteredHrData = hourlyData.filter(
        (hrdata) => hrdata.hourlyDataCategory === '45_SEATER'
      );
      setSelectedHourlyData(filteredHrData[0].data)
    }else {

      const filteredHrData = hourlyData.filter(
        (hrdata) => hrdata.hourlyDataCategory === '6_7_9_13_SEATER'
      );
      setSelectedHourlyData(filteredHrData[0].data)
      console.log("filteredHrData :", filteredHrData[0].data)
    }

  };

  //SERVICE HANDLER
  const serviceSelectHandler = (service) => {

    setSelectedService(service);
    setCruiseTerminalsStatus(false)


    console.log("Service[0]  : ", service[0])

    const res = subServices.filter(
      (subService) => subService.serviceCode === service[0].serviceCode
    );

    console.log("filtered sub Services[0]  : ", res)

    if(service[0].serviceCategory === "AIRPORT_TRANSFER" || service[0].serviceCategory === "CRUISE_TRANSFER") {
    setWayTransferPrice('')
    }
    if( service[0].serviceCategory === "CRUISE_TRANSFER") {
      setCruiseTerminalsStatus(true)
      
      }


    if(service[0].serviceCategory === "ONE_WAY_TRANSFER" || service[0].serviceCategory === "TWO_WAY_TRANSFER") {
    console.log("Inside one way")

    setServiceStatus(false)
    setHoursStatus(false)

      setWayTransferPrice(`Price : $${res[0].price}`)
      // subServiceSelectHandler(res)
      // setfilteredSubServices(null)
      return
    }

    if(service[0].serviceCategory === "HOURLY_BOOKING") {
      setWayTransferPrice('')
    
    setHoursStatus(true);
    setServiceStatus(false)

      if(service[0].vehicleCategory === '6_SEATER' || '7_SEATER' || '9_SEATER' || '13_SEATER') {
      
      // setHourlyData(hourlyData67913)



      const res1 = subServices.filter(
      (subService) => subService.subServiceCategory === 'HOURLY_BOOKING'
      );

      // setSelectedSubService(res1);
 
      }

      setWayTransferPrice(``);
      setfilteredSubServices(res);

      
      
    //   let tempPriceDetails = {...fullPriceDetails.priceDetails}
    // console.log('fullPriceDetails : ', fullPriceDetails);
    // console.log('fullPriceDetails.priceDetails : ', fullPriceDetails.priceDetails)
    // console.log('final implementation', {...fullPriceDetails, priceDetails : {...tempPriceDetails, servicePrice : service[0].price}})
    
    // dispatch(modifyTotalPriceAction({...fullPriceDetails, 
    //   priceDetails : {...fullPriceDetails.priceDetails, servicePrice : service[0].price}}, fullPriceDetails.paymentMethod));

      return
    }

    if(service[0].serviceCategory === "AIRPORT_TRANSFER") {
      setfilteredSubServices(res); 
      
      setServiceStatus(true)
      setHoursStatus(false)
    }

    if(service[0].serviceCategory === "CRUISE_TRANSFER") {
      setfilteredSubServices(res); 
      
      setServiceStatus(true)
      setHoursStatus(false)
    }



  };

  const subServiceSelectHandler = (subService) => {
    setSelectedSubService(subService);

    if(subService[0].subServiceCategory === 'AIRPORT_DEP' || subService[0].subServiceCategory === 'AIRPORT_DEP_ARR'){
      setDropoffAddress('Airport')
      setTerminalStatus(true)
    }else if(subService[0].subServiceCategory === 'AIRPORT_ARR'){
      setPickupAddress('Airport')
      setTerminalStatus(true)
    }else {
      setTerminalStatus(false)
    }


    if(subService[0].subServiceCategory === 'CRUISE_DEP'){
      setCruiseTerminalsStatus(true)
    }else if(subService[0].subServiceCategory === 'CRUISE_ARR'){
      setCruiseTerminalsStatus(true)
    }else {
      setCruiseTerminalsStatus(false)
    }





    console.log("subService  : ", subService)

    let tempPriceDetails = {...fullPriceDetails.priceDetails}
    console.log('fullPriceDetails : ', fullPriceDetails);
    console.log('fullPriceDetails.priceDetails : ', fullPriceDetails.priceDetails)
    console.log('final implementation', {...fullPriceDetails, priceDetails : {...tempPriceDetails, servicePrice : subService[0].price}})
    
    dispatch(modifyTotalPriceAction({...fullPriceDetails, 
      priceDetails : {...fullPriceDetails.priceDetails, servicePrice : subService[0].price}}, fullPriceDetails.paymentMethod));

  };

  const handleHoursData = (hoursData) => {

      setSelectedSubService([{
        ...selectedSubService[0], 
        price: hoursData[0].value,
        title : hoursData[0].title      
      }]);

    // console.log("CHECK PYT : ", [{
    //   ...selectedSubService[0], 
    //   price: hoursData[0].value,
    //   title : hoursData[0].title
    
    // }])  
 
      

    console.log('Inside hours Data : ', hoursData);
    let tempPriceDetails = {...fullPriceDetails.priceDetails}
    console.log('fullPriceDetails : ', fullPriceDetails);
    console.log('fullPriceDetails.priceDetails : ', fullPriceDetails.priceDetails)
    console.log('final implementation', {...fullPriceDetails, priceDetails : {...tempPriceDetails, servicePrice : hoursData[0].value}})
    


    dispatch(modifyTotalPriceAction({...fullPriceDetails, 
      priceDetails : {...fullPriceDetails.priceDetails, servicePrice : hoursData[0].value}}, fullPriceDetails.paymentMethod));

  }


  // const cruiseTerminalSelectHandler = (selectedCruiseTerminal) => {
  //   // setSelectedService(service);

  //   console.log("Service[0]  : ", selectedCruiseTerminal)

  //   // const res = subServices.filter(
  //   //   (subService) => subService.serviceId === service[0].value
  //   // );

  //   console.log("filtered sub Services[0]  : ", res)

  // }

  const handleCruiseTerminal = (ct) => {
    setCruiseTerminal(ct[0].value)

    if(selectedSubService[0].subServiceCategory === 'CRUISE_DEP'){
      setDropoffAddress(ct[0].value)
    }
    if(selectedSubService[0].subServiceCategory === 'CRUISE_ARR'){
      setPickupAddress(ct[0].value)
    }

  }
  const handleSelectedPaymentMethod = (paymentMethod) => {
    console.log("Handle select value e: ", paymentMethod[0].value)
    dispatch(modifyTotalPriceAction({...fullPriceDetails}, paymentMethod[0].value ));
  }



  return (
    <>
      <MetaData title={`Book Now`} />
      <section className="" style={{ backgroundColor: "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Book Now</h3>
                  {vehicles && (
                    <div
                      data-mdb-input-init
                      className="form-outline mb-4 text-start"
                    >
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Choose the vehicle
                      </label>

                      <Select
                        options={vehicles}
                        labelField="name"
                        valueField="_id"
                        placeholder="Select the vehicle"
                        onChange={(vehicle) => vehicleSelectHandler(vehicle)}
                      />
                    </div>
                  )}
                  {filteredServices && (
                    <div
                      data-mdb-input-init
                      className="form-outline mb-4 text-start"
                    >
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Service Type
                      </label>

                      <Select
                        options={filteredServices}
                        labelField="label"
                        valueField="_id"
                        placeholder="Select the service"
                        onChange={(service) => serviceSelectHandler(service)}
                      />
                    </div>
                  )}

                  {serviceStatus && (
                    <div
                      data-mdb-input-init
                      className="form-outline mb-4 text-start"
                    >
                      <label className="form-label" htmlFor="typePasswordX-3">
                        Service
                      </label>

                      <Select
                       
                        id="subService"
                        options={filteredSubServices}
                        labelField="label"
                        valueField="_id"
                        placeholder="Select the service"
                        
                        onChange={(subService) => subServiceSelectHandler(subService)}
                      />
                    </div>
                  )}
                  {wayTransferPrice && (
                  <h6 id="transferPrice">{wayTransferPrice}</h6>
                  )}

                  {cruiseTerminalsStatus && (
                    <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-3">
                      Select Cruise Terminal
                    </label>

                    <Select
                     
                      id="cruiseTerminals"
                      options={cruiseTerminals}
                      labelField="name"
                      valueField="_id"
                      placeholder="Select the cruise Terminals"
                      
                      onChange={(ct) => handleCruiseTerminal(ct)}

                    />
                  </div>
                  )}


                  {hoursStatus  && ( 
                    <div
                      data-mdb-input-init
                      className="form-outline mb-4 text-start"
                    >
                      <label className="form-label" htmlFor="typePasswordX-3">
                        Select Hours
                      </label>

                      <Select
                       
                        id="hourlyinput"
                        options={selectedHourlyData}
                        labelField="name"
                        valueField="_id"
                        placeholder="Select the hours"
                        
                        onChange={(hours) => handleHoursData(hours)}
                      />
                    </div>
                  )}

                  {terminalStatus  && ( 
                    <div
                      data-mdb-input-init
                      className="form-outline mb-4 text-start"
                    >
                      <label className="form-label" htmlFor="typePasswordX-3">
                        Select Terminal
                      </label>

                      <Select
                       
                        id="terminalInput"
                        options={terminalsData}
                        labelField="name"
                        valueField="_id"
                        placeholder="Select the Terminal"
                        
                        onChange={(t) => setTerminal(t[0].value)}
                      />
                    </div>
                  )}



                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Date
                    </label>

                    <DatePicker
                      aria-label="Date"
                      type="date"
                      id="date"
                      className="form-control form-control-lg"
                      //   placeholder="choose the vehicle"
                      value={date}
                      onChange={(d) => setDate(d)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Time
                    </label>

                    <TimePicker
                      aria-label="Time"
                      type="time"
                      id="time"
                      className="form-control form-control-lg"
                      //   placeholder="choose the vehicle"
                      value={time}
                      onChange={(t) => setTime(t)}
                    />
                  </div>

                  



                  
                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Pick-up Address
                    </label>

                    <input
                      type="text"
                      id="pickupAddress"
                      className="form-control form-control-lg"
                      placeholder="Pick-up address"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Drop-off Address
                    </label>

                    <input
                      type="text"
                      id="dropoffAddress"
                      className="form-control form-control-lg"
                      placeholder="Drop-off address"
                      value={dropoffAddress}
                      onChange={(e) => setDropoffAddress(e.target.value)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      No of pax
                    </label>

                    <input
                      type="Number"
                      id="noOfPax"
                      className="form-control form-control-lg"
                      placeholder="0"
                      value={noOfPax}
                      onChange={(e) => setNoOfPax(e.target.value)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      No of Luggages
                    </label>

                    <input
                      type="Number"
                      id="noOfLugg"
                      className="form-control form-control-lg"
                      placeholder="0"
                      value={noOfLuggage}
                      onChange={(e) => setNoOfLuggage(e.target.value)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Email
                    </label>

                    <input
                      type="text"
                      id="email-2"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      id="phoneNumber"
                      className="form-control form-control-lg"
                      placeholder=""
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Add your message
                    </label>

                    <textarea
                      type="text"
                      id="message"
                      className="form-control form-control-lg"
                      placeholder="Add your message"
                      rows="3"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <div
                    data-mdb-input-init
                    className="form-outline mb-4 text-start"
                  >
                    <label className="form-label" htmlFor="paymentmethod-2">
                      Payment Mode
                    </label>

                    <Select
                      options={paymentMethods}
                      labelField="name"
                      valueField="_id"
                      placeholder="Select the Payment method"
                      onChange={(paymentMethod) =>
                        {
                        setSelectedPaymentMethod(paymentMethod)
                        handleSelectedPaymentMethod(paymentMethod)
                        }
                      }
                    />
                  </div>

                  {/* ADDITIONAL CHARGES CHECK BOXES */}

                  

                {fullPriceDetails && (<><div className="form-check-outline mb-2 text-start ps-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                      checked={midnightSurcharge}
                      onChange={(e) => {
                        let r=0;
                        if(e.target.checked){r=10; setMidnightSurcharge(true)}
                        else{r=0; setMidnightSurcharge(false)}
                        dispatch(modifyTotalPriceAction({
                          ...fullPriceDetails, 
                          priceDetails : {...fullPriceDetails.priceDetails, midnightSurcharge : r}}, fullPriceDetails.paymentMethod));
                      }}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck1">
                      Midnight Surcharge 23:00Hrs To 06:00Hrs Additional $10
                    </label>
                  </div>

                  <div className="form-check-outline mb-2 text-start ps-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck2"
                      checked={tuasSouthBoulevard}
                      onChange={(e) => {
                        let r=0;
                        if(e.target.checked){r=20; setTuasSouthBoulevard(true)}
                        else{r=0; setTuasSouthBoulevard(false)}
                        dispatch(modifyTotalPriceAction({
                          ...fullPriceDetails, 
                          priceDetails : {...fullPriceDetails.priceDetails, tuasSouthBoulevard : r}}, fullPriceDetails.paymentMethod));
                      }}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck2">
                      Tuas South Boulevard $20
                    </label>
                  </div>

                  <div className="form-check-outline mb-2 text-start ps-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck3"
                      checked={additionalStopAlongtheWay}
                      onChange={(e) => {
                        let r=0;
                        if(e.target.checked){r=10; setAdditionalStopAlongtheWay(true)}
                        else{r=0; setAdditionalStopAlongtheWay(false)}
                        dispatch(modifyTotalPriceAction({
                          ...fullPriceDetails, 
                          priceDetails : {...fullPriceDetails.priceDetails, additionalStopAlongtheWay : r}},  fullPriceDetails.paymentMethod));
                      }}
                   
                    />
                    <label className="form-check-label" htmlFor="defaultCheck3">
                      Additional Stop Along The Way (Below 2Km) $10
                    </label>
                  </div>
                  
                  <div className="form-check-outline mb-2 text-start ps-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck4"
                      checked={additionalStopOutoftheWay}
                      onChange={(e) => {
                        let r=0;
                        if(e.target.checked){r=20; setAdditionalStopOutoftheWay(true)}
                        else{r=0; setAdditionalStopOutoftheWay(false)}
                        dispatch(modifyTotalPriceAction({
                          ...fullPriceDetails, 
                          priceDetails : {...fullPriceDetails.priceDetails, additionalStopOutoftheWay : r}}, fullPriceDetails.paymentMethod));
                      }}
                      
                    />
                    <label className="form-check-label" htmlFor="defaultCheck4">
                      Additional Stop Out Of The Way (Above 2Km) $20
                    </label>
                  </div>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    id="submitBtn"
                    disabled={loading}
                    onClick={(e) => submitHandler(e)}
                  >
                    {fullPriceDetails.totalPrice !== 0 && `$${fullPriceDetails.totalPrice} `}Book Now
                  </button>



                </>
                )}

                  

                  
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
