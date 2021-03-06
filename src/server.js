// ide teszem azokat a dolgokat melyeket közösen használom a tsztelés és az éles futtatás alatt is

const express = require('express');
const config = require('config');
const logger = require('./config/logger');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//AUTHENTICATION
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminonly.js');
const authHandler = require('./auth/autthhandler');


const swaggerDocument = YAML.load('./docs/swagger.yaml')



const { username, password, host} = config.get('database');
mongoose
// .connect('mongodb+srv://admin01:Camel123@cluster01.9rocg.mongodb.net/Cluster01?retryWrites=true&w=majority' ----> mikor az env file-t betöltjük:
.connect(`mongodb+srv://${username}:${password}@${host}`,

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

//ROUTER logic
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

app.use('/person', authenticateJwt, require('./controllers/person/person.routes'));
app.use('/post', authenticateJwt, adminOnly, require('./controllers/post/post.routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use( (err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    })
})

module.exports = app;