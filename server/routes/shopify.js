const { Router } = require("express");
const shopifyRouter = Router();
require("dotenv").config();

const SHOPIFY_API_ACCESS_TOKEN = process.env.SHOPIFY_API_ACCESS_TOKEN;
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;

shopifyRouter.post("/", async (req, res) => {
  //const fetchData = async () => {
  const productUrl = `https://${SHOPIFY_STORE_URL}/admin/api/2023-10/products.json`;
  const homeUrl = `https://${SHOPIFY_STORE_URL}/admin/api/2023-10/shop.json`;
  const policiesUrl = `https://${SHOPIFY_STORE_URL}/admin/api/2023-10/policies.json`;

  try {
    const response = await fetch(productUrl, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_API_ACCESS_TOKEN,
      },
    });
    const data = await response.json();
    console.log("hello");

    const homeData = await fetch(homeUrl, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_API_ACCESS_TOKEN,
      },
    });
    const home = await homeData.json();

    res.json({ home, data });
  } catch (error) {
    console.error("trouble fetching data", error);
    //};
  }
});

module.exports = shopifyRouter;
