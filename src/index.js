const express = require('express')
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./config/logger');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const port = 3000;

//Database connection
mongoose
.connect('mongodb+srv://admin01:Camel123@cluster01.9rocg.mongodb.net/Cluster01?retryWrites=true&w=majority',
{
useNewUrlParser: true,
useUnifiedTopology: true
})
.then( () => logger.info('MongoDB connection has been established successfully'))
.catch(err => {
    logger.error(err);
    process.exit();
})


// app.get('/', (req, res) => {
//     res.send('Hello World');

// });

// (minden elé rakom BeforeUnloadEvent, hogy hogyan logoljon)
app.use(morgan('combined', {stream: logger.stream}));

// app.use('/images', express.static('images')) - aztán beteszem a képeket a public file-ba, és megmondom neki, hogy a statikus file.okat a publicban keresse. Nem kell az images, ahogy a weblapon nem kell a public
app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/person', require('./controllers/person/routes'));

app.use( (err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    })
})

app.listen(port, () => {
 console.log(`App listening at http://localhost:${port}`);
})