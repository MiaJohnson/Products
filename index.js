const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sample product data (in-memory array)
const products = [
    { 
        id: 1,
        barcode: 846336000242, 
        upc: '846336000242', 
        sku: 'T920EZ', 
        proucttype: 'Grain', 
        feedtype:'textured', 
        manufacturer: 'Tribute', 
        productname: 'Kalm N Ez', 
        price: 22.99, 
        weight:50,
        description:'A low sugar and starch (NSC), pelleted feed with a small inclusion of whole oats.',
        link: 'https://tributeequinenutrition.com/products/kalm-n-ez-textured'
    },
    { 
        id: 2, 
        upc: '846336000211', 
        sku: '920P', 
        proucttype: 'Grain', 
        feedtype:'pelleted', 
        manufacturer: 'Tribute', 
        productname: 'Kalm N Ez', 
        price: 22.99, 
        weight:50,
        description: 'A low sugar and starch (NSC), pelleted horse feed for all classes of adult horses.',
        link: 'https://tributeequinenutrition.com/products/kalm-n-ez-pellet'
    },
    { 
        id: 3, 
        upc: '846336004813', 
        sku: '928EK30', 
        proucttype: 'Grain', 
        feedtype:'pelleted', 
        manufacturer: 'Tribute', 
        productname: 'Essential K', 
        price: 24.99, 
        weight:50,
        description: 'A low NSC ration balancer for idle, breeding, growing and performance horses.',
        link: 'https://tributeequinenutrition.com/products/essential-k'
    },
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