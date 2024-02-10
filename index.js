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
        producttype: 'Grain', 
        feedtype:'textured', 
        manufacturer: 'Tribute', 
        productname: 'Kalm N Ez', 
        price: 22.99, 
        weight:50,
        description:'A low sugar and starch (NSC), pelleted feed with a small inclusion of whole oats.',
        link: 'https://tributeequinenutrition.com/products/kalm-n-ez-textured',
        dateAdded: '2024-02-10T11:48:43.511Z'
    },
    { 
        id: 2, 
        upc: '846336000211', 
        sku: '920P', 
        producttype: 'Grain', 
        feedtype:'pelleted', 
        manufacturer: 'Tribute', 
        productname: 'Kalm N Ez', 
        price: 22.99, 
        weight:50,
        description: 'A low sugar and starch (NSC), pelleted horse feed for all classes of adult horses.',
        link: 'https://tributeequinenutrition.com/products/kalm-n-ez-pellet',
        dateAdded: '2024-02-10T11:48:43.511Z'
    },
    { 
        id: 3, 
        upc: '846336004813', 
        sku: '928EK30', 
        producttype: 'Grain', 
        feedtype:'pelleted', 
        manufacturer: 'Tribute', 
        productname: 'Essential K', 
        price: 24.99, 
        weight:50,
        description: 'A low NSC ration balancer for idle, breeding, growing and performance horses.',
        link: 'https://tributeequinenutrition.com/products/essential-k',
        dateAdded: '2024-02-10T11:48:43.511Z'
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
app.get('/api/products/upc/:upc', (req, res) => {
    const upcId = parseInt(req.params.upc);
    const product = products.find(p => p.upc === upcId);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json(product);
    }
});


// Get all products added after a specific date.
app.get('/api/products/bydate/:date', (req, res) => {
    const date = parseInt(req.params.date);
    const products = products.find(p => p.dateAdded >= date);
    if (!products) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json(products);
    }
});

// Get a specific product by manufacturer
app.get('/api/products/producttype/:producttype', (req, res) => {
    const productType = parseInt(req.params.producttype);
    const prodTypes = products.find(p => p.producttype === productType);
    if (!prodTypes) {
        res.status(404).json({ error: 'Products not found' });
    } else {
        res.json(prodTypes);
    }
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});