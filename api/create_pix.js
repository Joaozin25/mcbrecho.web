export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { amount, description, payer } = req.body;

    const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

    if (!MP_ACCESS_TOKEN) {
      return res.status(500).json({ error: "Access Token não configurado" });
    }

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        transaction_amount: Number(amount),
        description,
        payment_method_id: "pix",
        payer
      })
    });

    const data = await response.json();

    if (data.status === 400 || data.status === 401) {
      console.log("❌ Erro Mercado Pago:", data);
      return res.status(500).json({ error: "Erro ao criar pagamento PIX" });
    }

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error("🔥 Erro interno:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
