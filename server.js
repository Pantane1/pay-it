import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Lipana } from "@lipana/sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve the frontend from /public

// Initialize Lipana SDK
const lipana = new Lipana({
  apiKey: process.env.LIPANA_SECRET_KEY,
  environment: "production", // change to "sandbox" for testing
});

// ─── POST /api/pay ─────────────────────────────────────────────────────────────
// Body: { phone: "+254712345678", amount: 500 }
app.post("/api/pay", async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ success: false, message: "Phone and amount are required." });
  }

  // Validate phone format (must start with +254 or 07/01)
  const phoneRegex = /^(\+254|0)[17]\d{8}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ success: false, message: "Invalid Kenyan phone number." });
  }

  // Normalise to +254 format
  const normalizedPhone = phone.startsWith("0")
    ? "+254" + phone.slice(1)
    : phone;

  if (isNaN(amount) || Number(amount) < 1) {
    return res.status(400).json({ success: false, message: "Amount must be at least KES 1." });
  }

  try {
    const stkResponse = await lipana.transactions.initiateStkPush({
      phone: normalizedPhone,
      amount: Number(amount),
    });

    return res.status(200).json({
      success: true,
      transactionId: stkResponse.transactionId,
      message: "STK Push sent! Check your phone for the M-Pesa prompt.",
    });
  } catch (err) {
    console.error("Lipana STK Push Error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Payment initiation failed. Try again.",
    });
  }
});

// ─── POST /api/webhook ─────────────────────────────────────────────────────────
// Lipana will POST payment status updates here
app.post("/api/webhook", (req, res) => {
  const payload = req.body;
  console.log("📩 Lipana Webhook received:", JSON.stringify(payload, null, 2));

  // TODO: Update your DB / notify your frontend via WebSocket/SSE here
  // payload.status === "SUCCESS" | "FAILED" | "CANCELLED"

  res.status(200).json({ received: true });
});

// ─── GET /api/transactions ─────────────────────────────────────────────────────
// Optional: list recent transactions
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await lipana.transactions.list();
    return res.status(200).json({ success: true, data: transactions });
  } catch (err) {
    console.error("List transactions error:", err);
    return res.status(500).json({ success: false, message: err?.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Lipana payment server running on http://localhost:${PORT}`);
});