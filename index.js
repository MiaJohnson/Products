const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sample product data (in-memory array)
const catalogs = [
    { 
        id: 1,
        upc: '846336000242', 
        sku: 'T920EZ', 
        category: 'Concentrates', 
        feedType:'Textured',
        brand: 'Tribute',
        manufacturer: 'Kalmbach Feeds, Inc', 
        productName: 'Kalm N Ez', 
        price: 22.99, 
        WeightPerUnitPurchased:50,
        description:'A low sugar and starch (NSC), pelleted feed with a small inclusion of whole oats.',
        url: "https://tributeequinenutrition.com/products/kalm-n-ez-textured",
        dateAdded: '1776-07-04',
        isImported: 'true'
    },
    { 
        id: 2, 
        upc: '846336000211', 
        sku: '920P', 
        category: 'Concentrates',
        feedType:'Pelleted',
        brand: 'Tribute',
        manufacturer: 'Kalmbach Feeds, Inc', 
        productName: 'Kalm N Ez', 
        price: 22.99, 
        WeightPerUnitPurchased:50,
        description: 'A low sugar and starch (NSC), pelleted horse feed for all classes of adult horses.',
        url: "https://tributeequinenutrition.com/products/kalm-n-ez-pellet",
        dateAdded: '1776-07-04',
        isImported: 'true'
    },
    { 
        id: 3, 
        upc: '846336004813', 
        sku: '928EK30', 
        category: 'Concentrates',
        feedType:'Pelleted', 
        brand: 'Tribute',
        manufacturer: 'Kalmbach Feeds, Inc', 
        productName: 'Essential K', 
        price: 24.99, 
        WeightPerUnitPurchased:50,
        description: 'A low NSC ration balancer for idle, breeding, growing and performance horses.',
        url: "https://tributeequinenutrition.com/products/essential-k",
        dateAdded: '1776-07-04',
        isImported: 'true'
    },
   
    {
        id: 4,
       upc: '736816326439',
        sku: '',
        category: 'Concentrates',
        feedType: 'Pelleted',
        brand: "Producer's Pride",
        manufacturer: "Producer's Pride",
        productName: '12% Sweet Horse Feed',
        price: 14.49,
        WeightPerUnitPurchased: 50,
        description: 'A sweet horse feed suitable for various life stages.',
        url: "https://www.tractorsupply.com/tsc/product/producers-pride-12-sweet-feed-50-lb",
        dateAdded: '1776-07-04',
        isImported: 'true'
    }
     // Add more products
];

// Get a specific product by Product Type
app.get('/api/catalogs/category/:category', (req, res) => {
    const requestedCategory = req.params.category;
    const filteredCatalogs = catalogs.filter(p => p.category === requestedCategory);
    res.json(filteredCatalogs.length ? filteredCatalogs : { error: 'No records with this catagory were found' });
});

// Get catalogs that were added on or after date passed in.
app.get('/api/catalogs/bydate/:date', (req, res) => {
    const date = new Date(req.params.date);
    if (isNaN(date)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    const filteredcatalogs = catalogs.filter(p => new Date(p.dateAdded) >= date);
    res.json(filteredcatalogs.length ? filteredcatalogs : { error: 'catalogs after date not found' });
});



// Get all catalogs
app.get('/api/catalogs', (req, res) => {
    res.json(catalogs);
});

// Get a specific catalog by ID
app.get('/api/catalogs/:id', (req, res) => {
    const catalogId = parseInt(req.params.id);
    const catalog = catalogs.find(p => p.id === catalogId);
    res.json(catalog || { error: 'Catalog with this ID was not found' });
});

// // Get a specific catalog by barcode
// app.get('/api/catalogs/upc/:upc', (req, res) => {
//     const requestedUpc = req.params.upc;

//     const catalogsMatchingUpc = catalogs.find(p => p.upc === requestedUpc);
//     if (!catalogsMatchingUpc) {
//         res.status(404).json({ error: 'catalogs with this UPC were not found' });
//     } else {
//         res.json(catalogsMatchingUpc);
//     }
// });

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});