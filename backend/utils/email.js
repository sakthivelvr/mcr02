const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(transport);

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <> ${process.env.SMTP_FROM_EMAIL}`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(message);
};

const sendEmailUsingGmail = async (options) => {
  let sender = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "maxicabride@gmail.com",
      pass: "oxzk klhp qvdd cygh",
    },
  });

  let order = options.myOrderObj;
  let d = new Date(order.pickupDate);
  let dateString = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  let additionalServices = [];
  for (const property in options.myOrderObj.additionalCharges) {
    if (order.additionalCharges[property].status) {
      if (property == "midnightSurcharge") {
        order.additionalCharges[property].charges = 10;
        additionalServices.push("<p>Midnight Surcharge : $10</p>");
      }
      if (property == "tuasSouthBoulevard") {
        order.additionalCharges[property].charges = 20;
        additionalServices.push("<p>Tuas South Boulevard : $20 </p>");
      }
      if (property == "additionalStopAlongtheWay") {
        order.additionalCharges[property].charges = 10;
        additionalServices.push("<p>Additional Stop Along the Way : $10 </p>");
      }
      if (property == "additionalStopOutoftheWay") {
        order.additionalCharges[property].charges = 20;
        additionalServices.push("<p>Additional Stop Out of the Way : $20 </p>");
      }
    }
  }

  let additionalServicesString = "";
  if (additionalServices.length > 0) {
    additionalServicesString =
      "<h4>Additional services :</h4>" + additionalServices.join("");
  }

  let color="color:MediumSeaGreen;"
  if(order.paymentDetails.paymentStatus === 'PENDING'){
    color="color:Tomato;"
  }
  let composeMail = {
    from: "maxicabride@gmail.com",
    to: "info@maxicabride.com",
    subject: "You got a booking!",
    html: `<div>
<h3 style=${color}>Hi Mr.Ragavan, You got a booking!</h3>
<br>
<p>Booking Date: ${dateString}</p>
<p>Time: ${order.pickupTime} Hrs</p>
<p>${order.serviceName} - ${order.vehicleName} (${order.category})</p>
<p>Name: ${order.customerDetails.name}</p>
<p>No of Pax: ${order.noOfPax}</p>
<p>No of Luggage: ${order.noOfLuggage}</p>
<p>Pick-up Address: ${order.pickupAddress}</p>
<p>Drop-off Address: ${order.dropoffAddress}</p>
<p>Email: ${order.customerDetails.email}</p>
<br>

<h3>Payment status</h3>
<h4>Net Amount: $${order.rate.fullAmount}</h4>
<p>Service Amount: $${order.rate.serviceAmount}</p>
<div>${additionalServicesString}</div>
<h4>Payment Mode: ${order.paymentDetails.paymentMode}</h4>
<h4 style=${color}>Status: ${order.paymentDetails.paymentStatus}</h4>

</div>
`,
  };

  let composeCustomerMail = {
    from: "maxicabride@gmail.com",
    to: options.email,
    subject: options.subject,
    html: `<div>
<h3>Hi ${order.customerDetails.name}, Your booking is confirmed!</h3>
<p>Thank you for choosing MaxicabRide</p> 
<p>We appreciate your trust in selecting MaxicabRide for your transportation needs. Our team ensures a comfortable and safe journey. </p>
<br>
<p>Booking Date: ${dateString}</p>
<p>Time: ${order.pickupTime} </p>
<p>${order.serviceName} - ${order.vehicleName} (${order.category})</p>
<p>Name: ${order.customerDetails.name}</p>
<p>No of Pax: ${order.noOfPax}</p>
<p>No of Luggage: ${order.noOfLuggage}</p>
<p>Pick-up Address: ${order.pickupAddress}</p>
<p>Drop-off Address: ${order.dropoffAddress}</p>
<p>Email: ${order.customerDetails.email}</p>
<br>

<h3>Payment status</h3>
<h4>Net Amount: $${order.rate.fullAmount}</h4>
<p>Service Amount: $${order.rate.serviceAmount}</p>
<div>${additionalServicesString}</div>
<p>Payment Mode: ${order.paymentDetails.paymentMode}</p>
<p>Status: ${order.paymentDetails.paymentStatus}</p>

</div>
`,
  };

  console.log("...................... inside send gmail function");

  await sender.sendMail(composeMail);
  await sender.sendMail(composeCustomerMail);
};

module.exports = sendEmail;
module.exports = sendEmailUsingGmail;


