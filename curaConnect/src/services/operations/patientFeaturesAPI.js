import { toast } from "react-hot-toast";
import { patientEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setPaymentLoading, resetCart } from "../../slices/cartSlice";
import logo from "../../assets/Images/CuraConnectLogo.jpg";


const {
  HEALTHPROGRAM_PAYMENT_API,
  HEALTHPROGRAM_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = patientEndpoints;


// Load Razorpay Script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}


export async function buyHealthProgram(
  token,
  healthPrograms,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");

  try {
    // Load Razorpay SDK
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    // Create Order
    const orderResponse = await apiConnector(
      "POST",
      HEALTHPROGRAM_PAYMENT_API,
      { healthPrograms },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,   // ✅ Vite env
      currency: orderResponse.data.data.currency,
      amount: orderResponse.data.data.amount,
      order_id: orderResponse.data.data.id,
      name: "CuraConnect",
      description: "Thank You for Purchasing the Health Program",
      image: logo,

      // ✅ Correct field name
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },

      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );

        verifyPayment(
          { ...response, healthPrograms },
          token,
          navigate,
          dispatch
        );
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  } catch (error) {
    console.log("Payment API error:", error);
    toast.error("Could not make Payment");
  }

  toast.dismiss(toastId);
}


// Send Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("Payment success email error:", error);
  }
}


// Verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      HEALTHPROGRAM_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success(
      "Payment Successful! You are enrolled in the Health Program"
    );

    navigate("/dashboard/my-health-programs");

    dispatch(resetCart());

  } catch (error) {
    console.log("Payment verify error:", error);
    toast.error("Could not verify payment");
  }

  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
