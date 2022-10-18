const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/event.routes.js');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database Connected'));
const app = express();
app.use(cors());
app.use(express.json())
app.use('/event', eventRoutes);
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on  port:${port}`);
});