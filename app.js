const express = require('express');
const bodyParser = require('body-parser');  // get the post request information
const pino = require('express-pino-logger')();
const cors = require('cors');
const proxy = require('express-http-proxy');
const path = require('path'); // this allows us to easily combine paths
require('dotenv').config({path: path.join(__dirname, '.env')}); // this allows us to read in variables from our .env file

const http = require("http");
const apiKey = process.env.WEATHER_API_KEY;
const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors({origin: '*'})); // allows cross platform http requests to be made
app.use(bodyParser.json());

const port = process.env.port;
app.listen(port || 3000, () => {
	console.log("Here!");
});