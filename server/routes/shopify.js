const { Router } = require("express");
const shopifyRouter = Router();
require("dotenv").config();

const SHOPIFY_API_ACCESS_TOKEN = process.env.SHOPIFY_API_ACCESS_TOKEN;
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;

const fetchData = async () => {
  const url = `https://${SHOPIFY_STORE_URL}/admin/api/2023-10/products.json`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": SHOPIFY_API_ACCESS_TOKEN,
    },
  });
  const data = await response.json()
  console.log(data);
};

fetchData();

module.exports = shopifyRouter;
