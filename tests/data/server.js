// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const YF_BASE = "https://query1.finance.yahoo.com";

app.get("/api/gainers", async (req, res) => {
  const url = `${YF_BASE}/v1/finance/screener/predefined/saved?scrIds=day_gainers`;
  const r = await fetch(url);
  const j = await r.json();
  res.json(j);
});

app.get("/api/losers", async (req, res) => {
  const url = `${YF_BASE}/v1/finance/screener/predefined/saved?scrIds=day_losers`;
  const r = await fetch(url);
  const j = await r.json();
  res.json(j);
});

app.get("/api/actives", async (req, res) => {
  const url = `${YF_BASE}/v1/finance/screener/predefined/saved?scrIds=most_actives`;
  const r = await fetch(url);
  const j = await r.json();
  res.json(j);
});

app.get("/api/chart/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const url = `${YF_BASE}/v8/finance/chart/${symbol}?range=6mo&interval=1d`;
  const r = await fetch(url);
  const j = await r.json();
  res.json(j);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
