import Product from "../models/Product.js";
import axios from "axios";

export async function createProduct(req, res) {
  // this product we have to get from API body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function fetchAllProducts(req, res) {
  try {
    // Fetch products from the API
    const response = await axios.get(
      "http://localhost:5000/products?limit=100"
    );
    let products = response.data.products || []; // Ensure products exist

    // Handle category filtering
    if (req.query.category) {
      const categories = Array.isArray(req.query.category)
        ? req.query.category
        : [req.query.category];
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Handle brand filtering
    if (req.query.brand) {
      const brands = Array.isArray(req.query.brand)
        ? req.query.brand
        : [req.query.brand];
      products = products.filter((product) => brands.includes(product.brand));
    }

    // Handle sorting
    if (req.query._sort && req.query._order) {
      const sortOrder = req.query._order === "asc" ? 1 : -1; // Ensure correct sort order
      products.sort((a, b) => {
        if (a[req.query._sort] < b[req.query._sort]) return -sortOrder;
        if (a[req.query._sort] > b[req.query._sort]) return sortOrder;
        return 0;
      });
    }

    // Handle pagination
    const pageSize = parseInt(req.query._limit) || 10; // Default page size
    const page = parseInt(req.query._page) || 1; // Default to page 1
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

    // Set total count in response header
    res.set("X-Total-Count", products.length);
    res.status(200).json(paginatedProducts);
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while fetching products",
      details: err.message,
    });
  }
}

export async function fetchProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await axios.get(`http://localhost:5000/products?id=${id}`);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
}
