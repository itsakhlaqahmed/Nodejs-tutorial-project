const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
require('dotenv').config()

const {ServerApiVersion} = require('mongodb')


const app = express();


// connect to db
mongoose.connect(process.env.DATABASE, {
  serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
}
})
.then(() => console.log('DB connected'))
.catch(err => console.log('DB CONNECTION ERROR', err))


// import routes
const authRoutes = require('./routes/auth')


// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json() )
// app.use(cors());  // allows all origins request our server
if (process.env.NODE_ENV = 'development'){
  
app.use(cors({origin: `http://localhost:3000` }));
}

//middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`API is running on port ${port} -${process.env.NODE_ENV}`)
})