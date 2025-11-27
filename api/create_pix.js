import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { amount, description, payer } = req.body;

    const body = {
      transaction_amount: amount,
      description: description,
      payment_method_id: "pix",
      payer: {
        email: payer.email
      }
    };

    const mpResponse = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify(body)
    });

    const data = await mpResponse.json();

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
