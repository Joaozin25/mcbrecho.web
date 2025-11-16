// server.js
// Dependências: npm install express node-fetch dotenv cors
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// 🔧 Configuração inicial
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// 🧭 Caminho absoluto da pasta public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public"))); // serve produto.html

// 🔑 Token do Mercado Pago
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
if (!MP_ACCESS_TOKEN) {
  console.warn("⚠️ MP_ACCESS_TOKEN não definido. Coloque em .env antes de rodar.");
}

// 💳 Rota de pagamento PIX
app.post("/create_pix", async (req, res) => {
  try {
    const { amount = 49.9, description = "Vestido Floral - MC Brechó", payer = { email: "test_user_123@test.com" } } = req.body;

    const body = {
      transaction_amount: Number(amount),
      description,
      payment_method_id: "pix",
      payer,
      external_reference: "VST-FLR-0123"
    };

    const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await mpRes.json();

    if (mpRes.ok) {
      return res.json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, error: data });
    }

  } catch (err) {
    console.error("Erro interno no servidor:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 🚀 Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor rodando em http://localhost:${PORT}`));
