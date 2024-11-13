const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendReserveRoute =require('./routes/sendReserve.routes')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'https://restaurant-site-9yvl.onrender.com', // Asegúrate de especificar el dominio de tu frontend
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization'
};
// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint
app.use('/', sendReserveRoute)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



