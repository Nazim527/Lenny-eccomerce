// api/paypalintegration/controllers/Paypalintegration.js
const axios = require("axios");

module.exports = {
  createOrder: async (ctx) => {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
    const base = "https://api-m.sandbox.paypal.com";
    const serverURL = "http://localhost:1347"; // Gerekli adresi ayarla

    const { cart } = ctx.request.body;

    try {
      if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
      }

      const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
      const tokenResponse = await axios.post(`${base}/v1/oauth2/token`, "grant_type=client_credentials", {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
      const accessToken = tokenResponse.data.access_token;

      const orderResponse = await axios.post(`${base}/v2/checkout/orders`, {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "110.00", // Gerçek tutar alınmalı
            },
          },
        ],
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const orderData = orderResponse.data;

      return ctx.send({ orderData });
    } catch (error) {
      return ctx.badRequest("Failed to create order");
    }
  },

  captureOrder: async (ctx) => {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
    const base = "https://api-m.sandbox.paypal.com";
    const serverURL = "http://localhost:1347"; // Gerekli adresi ayarla

    const { orderID } = ctx.params;

    try {
      if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
      }

      const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
      const tokenResponse = await axios.post(`${base}/v1/oauth2/token`, "grant_type=client_credentials", {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
      const accessToken = tokenResponse.data.access_token;

      const captureResponse = await axios.post(`${base}/v2/checkout/orders/${orderID}/capture`, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const captureData = captureResponse.data;

      return ctx.send({ captureData });
    } catch (error) {
      return ctx.badRequest("Failed to capture order");
    }
  },
};
