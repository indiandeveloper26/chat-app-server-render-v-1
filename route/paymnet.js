// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";

// const pymentroute = express.Router();

// // ✅ Setup Razorpay instance
// const razorpay = new Razorpay({
//   key_id: "rzp_test_6uJbkhUuEgNohr",
//   key_secret: "tTSXioq5dDzEKS47ukYAp5rL",
// })

// // ✅ Create Order
// pymentroute.post("/order", async (req, res) => {

//     // res.send("pay")
//   try {
//     const { amount, currency = "INR", receipt = "receipt#1" } = req.body;
//     const options = {
//       amount: amount * 100, // Rs to paise
//       currency,
//       receipt,
//     };
//     const order = await razorpay.orders.create(options);
//     console.log("✅ Order Created:", order);
//     res.json(order);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error creating order");
//   }
// });







// // ✅ Verify Signature
// pymentroute.post("/verify", (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;


 
//   const sign = crypto
//     .createHmac("sha256", razorpay.key_secret)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");

//   if (sign === razorpay_signature) {
//     console.log("✅ Signature Verified");
//     res.json({ status: "Payment Verified ✅" });
//   } else {
//     console.log("❌ Signature Mismatch");
//     res.status(400).send("Invalid signature");
//   }
// });

// export default pymentroute;

















import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Crateuser from "../modal/saveuser.js"

const pymentroute = express.Router();

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_live_oAJE17BlSQtzuY",
  key_secret: "lH5QoIzw9g1wNKpDxC4eQr6N",
});

// ✅ Create Order
pymentroute.post("/order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1" } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: amount * 100,
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Order Created:", order);

    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error creating order");
  }
});



// 



// ✅ Verify Signature + Premium
pymentroute.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      username, // ✅ react native se bhejna hoga
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !username) {
      return res.status(400).json({ error: "Missing params" });
    }

    const sign = crypto
      .createHmac("sha256", razorpay.key_secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("👀 Calculated:", sign);
    console.log("👀 Sent:", razorpay_signature);

    if (sign !== razorpay_signature) {
      console.log("❌ Signature Mismatch");
      return res.status(400).send("Invalid signature");
    }

    console.log("✅ Signature Verified");

    // ✅ Add 1 month premium
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const user = await Crateuser.findOneAndUpdate(
      { username },
      {
        isPremium: true,
        premiumExpiry: expiryDate,
      },
      { new: true, upsert: true }
    );

    console.log(`👑 ${username} premium till ${expiryDate}`);

    return res.json({
      status: "Payment Verified ✅",
      premiumUntil: expiryDate,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});









export default pymentroute;