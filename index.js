const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sample product data (in-memory array)
const products = [
    { id: 1, barcode: 1234, name: 'Widget A', price: 19.99 },
    { id: 2, barcode: 5678, name: 'Gizmo B', price: 29.99 },
    // Add more products
];

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get a specific product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json(product);
    }
});

// Get a specific product by barcode
app.get('/api/products/barcode/:barcode', (req, res) => {
    const barcodeId = parseInt(req.params.barcode);
    const product = products.find(p => p.barcode === barcodeId);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json(product);
    }
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});