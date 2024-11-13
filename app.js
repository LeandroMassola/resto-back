const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendReserveRoute =require('./routes/sendReserve.routes')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint
app.use('/', sendReserveRoute)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



