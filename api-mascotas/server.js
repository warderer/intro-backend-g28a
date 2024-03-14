const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Llamas en pijamas')
});

// CRUD


// Create
app.post('/api/mascotas', (req, res) => {

});

// Get all
app.get('/api/mascotas', (req, res) => {
    
});



app.listen(3000, () => {
    console.log('Server on');
});
