const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Llamas en pijamas')
});

app.listen(3000, () => {
    console.log('Server on');
});
