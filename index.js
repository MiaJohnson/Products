const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sample product data (in-memory array)
const products = [
    { 
        id: 1,
        upc: '846336000242', 
        sku: 'T920EZ', 
        productType: 'Grain', 
        feedType:'Textured',
        brand: 'Tribute',
        manufacturer: 'Kalmbach Feeds, Inc', 
        productName: 'Kalm N Ez', 
        price: 22.99, 
        weight:50,
        description:'A low sugar and starch (NSC), pelleted feed with a small inclusion of whole oats.',
        url: 'https://tributeequinenutrition.com/products/kalm-n-ez-textured',
        dateAdded: '1776-07-04',
        isImported: 'true'
    },
    { 
        id: 2, 
        upc: '846336000211', 
        sku: '920P', 
        productType: 'Grain',
        feedType:'Pelleted',
        brand: 'Tribute',
        manufacturer: 'Kalmbach Feeds, Inc', 
        productName: 'Kalm N Ez', 
        price: 22.99, 
        weight:50,
        description: 'A low sugar and starch (NSC), pelleted horse feed for all classes of adult horses.',
        url: 'https://tributeequinenutrition.com/products/kalm-n-ez-pellet',
        dateAdded: '1776-07-04',
        isImported: 'true'
    },
    { 
        id: 3, 
        upc: '846336004813', 
        sku: '928EK30', 
        productType: 'Grain',
        feedType:'Pelleted', 
        brand: 'Tribute',
        manufacturer: 'Kalmbach Feeds, Inc', 
        productName: 'Essential K', 
        price: 24.99, 
        weight:50,
        description: 'A low NSC ration balancer for idle, breeding, growing and performance horses.',
        url: "https://tributeequinenutrition.com/products/essential-k",
        dateAdded: '1776-07-04',
        isImported: 'true'
    },
   
    {
        id: 4,
       upc: '736816326439 ',
        sku: '',
        productType: 'Grain',
        feedType: 'Pelleted',
        brand: "Producer's Pride",
        manufacturer: "Producer's Pride",
        productName: '12% Sweet Horse Feed',
        price: 14.49,
        weight: 50,
        description: 'A sweet horse feed suitable for various life stages.',
        url: 'https://www.tractorsupply.com/tsc/product/producers-pride-12-sweet-feed-50-lb',
        dateAdded: '1776-07-04',
        isImported: 'true'
    }
     // Add more products
];

// Get a specific product by Product Type
app.get('/api/products/productType/:productType', (req, res) => {
    const requestedproductType = req.params.productType;
    const filteredProducts = products.filter(p => p.productType === requestedproductType);
    res.json(filteredProducts.length ? filteredProducts : { error: 'Product type not found' });
});

// Get products that were added on or after date passed in.
app.get('/api/products/bydate/:date', (req, res) => {
    const date = new Date(req.params.date);
    if (isNaN(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    const filteredProducts = products.filter(p => new Date(p.dateAdded) >= date);
    res.json(filteredProducts.length ? filteredProducts : { error: 'Products after date not found' });
});



// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get a specific product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    res.json(product || { error: 'Product with this ID was not found' });
});

// // Get a specific product by barcode
// app.get('/api/products/upc/:upc', (req, res) => {
//     const requestedUpc = req.params.upc;

//     const productsMatchingUpc = products.find(p => p.upc === requestedUpc);
//     if (!productsMatchingUpc) {
//         res.status(404).json({ error: 'Products with this UPC were not found' });
//     } else {
//         res.json(productsMatchingUpc);
//     }
// });

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});