const express = require('express')
const app = express()
const connectDB = require('./config/db');
const dotenv = require('dotenv')



//env setting
dotenv.config({path : './config/config.env'})

//for mongodb
connectDB();

//set port
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//route
const products = require('./routes/product');
const orders = require('./routes/order');
const auth = require('./routes/auth')

app.use('/api/v1/product',products)
app.use('/api/v1/order',orders)
app.use('/api/v1/auth',auth)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
