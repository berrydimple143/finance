import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';

const morgan = require('morgan');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database connected successfully.'))
.catch((err) => console.log('Database connection error. Log: ', err));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000"] }));

//routes
readdirSync('./routes').map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Church finance application is listening on port ${port}.`);
});