import { useState, useEffect } from "react";
import axios from "axios";

function UpcomingEvent() {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/upcoming")
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handlePayment = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: event.price * 100, // convert to paise
      }
    );

    const { orderId, key } = res.data;

    const options = {
      key,
      amount: event.price * 100,
      currency: "INR",
      name: event.title,
      description: "Event Registration",
      order_id: orderId,

      handler: async function (response) {
        // Verify payment
        const verify = await axios.post(
          "http://localhost:5000/api/payment/verify",
          {
            orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }
        );

        if (verify.data.success) {
          alert("Payment Successful!");
        } else {
          alert("Payment Failed!");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!event) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <h3>Price: ₹{event.price}</h3>

      <button
        onClick={handlePayment}
        style={{ padding: "10px 20px", background: "blue", color: "white" }}
      >
        Register & Pay
      </button>
    </div>
  );
}

export default UpcomingEvent;
